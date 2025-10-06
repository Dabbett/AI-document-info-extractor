import { connectDB } from "@/db";
import { Quiz, Question, Answer } from "@/db/schema";

interface SaveQuizData {
    name: string;
    description: string;
    questions: Array<{
        questionText: string;
        answers?: Array<{
            answerText: string;
            isCorrect: boolean;
        }>;
    }>;
}

export default async function saveQuiz(quizData: SaveQuizData) {
    await connectDB();
    
    const { name, description, questions } = quizData;

    // Create the quiz
    const newQuiz = new Quiz({
        name,
        description
    });
    const savedQuiz = await newQuiz.save();
    const quizId = savedQuiz._id;

    // Create questions and answers
    const questionIds = [];
    for (const questionData of questions) {
        const newQuestion = new Question({
            questionText: questionData.questionText,
            quizId: quizId
        });
        const savedQuestion = await newQuestion.save();
        questionIds.push(savedQuestion._id);

        if (questionData.answers && questionData.answers.length > 0) {
            const answers = questionData.answers.map((answer) => ({
                answerText: answer.answerText,
                isCorrect: answer.isCorrect,
                questionId: savedQuestion._id
            }));
            
            const savedAnswers = await Answer.insertMany(answers);
            
            // Update question with answer IDs
            await Question.findByIdAndUpdate(
                savedQuestion._id,
                { answers: savedAnswers.map(answer => answer._id) }
            );
        }
    }

    // Update quiz with question IDs
    await Quiz.findByIdAndUpdate(quizId, { questions: questionIds });

    console.log('Quiz saved to MongoDB:', { quizId, name, description });
    return { quizId: quizId.toString() };
}