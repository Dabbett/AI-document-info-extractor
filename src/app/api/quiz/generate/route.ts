import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai"
import { HumanMessage } from "@langchain/core/messages"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

import saveQuiz from "./saveToDb";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const body = await req.formData();
        const document = body.get("pdf");

        if (!document) {
            return NextResponse.json(
                { error: "No PDF file provided." },
                { status: 400 }
            );
        }

        console.log("Processing PDF file...");
        
        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: " "
        });
        const docs = await pdfLoader.load();

        console.log(`Loaded ${docs.length} pages from PDF`);

        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        if (texts.length === 0) {
            return NextResponse.json(
                { error: "No readable text found in PDF." },
                { status: 400 }
            );
        }

        // Limit text to first 2000 characters to reduce token usage
        const limitedText = texts.join("\n").substring(0, 2000);

        console.log("Extracting text content...");

        const prompt = "Generate a quiz with 5 multiple choice questions based on this text. Each question should have 4 answers with 1 correct. Return JSON: {name, description, questions: [{questionText, answers: [{answerText, isCorrect}]}]}"
        
        if(!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OpenAI key not provided." },
                { status: 500 })
        }

        console.log("Initializing OpenAI model...");

        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo"  // Much cheaper than gpt-4-1106-preview
        });
        
        const parser = new JsonOutputFunctionsParser();
        const extractionFunctionSchema = {
            name: "extractor",
            description: "Extracts the fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quiz: {
                        type: "object",
                        properties: {
                            name: {type: "string"},
                            description: {type: "string"},
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: { type: "string" },
                                        answers: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    answerText: {type: "string" },
                                                    isCorrect: {type: "boolean" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };

        const runnable = model
        .bind({
            functions: [extractionFunctionSchema],
            function_call: {name: "extractor"},
        })
        .pipe(parser);

        const message = new HumanMessage({
            content: [
                {
                    type: "text",
                    text: prompt + "\n" + limitedText,
                },
            ],
        });

        console.log("Generating quiz with AI...");
        const result: any = await runnable.invoke([message]);
        console.log("AI response received:", result);
        
        // Log estimated token usage for cost monitoring
        const inputTokens = (prompt + limitedText).length / 4; // Rough estimate
        const outputTokens = JSON.stringify(result).length / 4;
        console.log(`Estimated tokens - Input: ${Math.round(inputTokens)}, Output: ${Math.round(outputTokens)}, Total: ${Math.round(inputTokens + outputTokens)}`);
        console.log(`Estimated cost: $${((inputTokens + outputTokens) * 0.000002).toFixed(6)}`);

        console.log("Saving quiz to database...");
        const { quizId } = await saveQuiz(result.quiz);
        console.log("Quiz saved with ID:", quizId);

        // Return the full quiz data for session storage
        const quizData = {
            _id: quizId,
            name: result.quiz.name,
            description: result.quiz.description,
            questions: result.quiz.questions.map((q: any, index: number) => ({
                _id: `temp_${index}`,
                questionText: q.questionText,
                answers: q.answers.map((a: any, aIndex: number) => ({
                    _id: `temp_${index}_${aIndex}`,
                    answerText: a.answerText,
                    isCorrect: a.isCorrect
                }))
            }))
        };

        return NextResponse.json(
            { quiz: quizData },
            { status: 200 })
    } catch(e:any) {
        console.error("Error in quiz generation:", e);
        return NextResponse.json(
            { error: e.message },
            { status: 500});
    }
}