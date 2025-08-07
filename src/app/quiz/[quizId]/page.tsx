import { connectDB } from "@/db";
import { Quiz, Question } from "@/db/schema";
import QuizQuestions from "../QuizQuestions";

const page = async ({ params }: {
    params: {
        quizId: string
    }
}) => {
    await connectDB();
    const quizId = params.quizId;
    
    try {
        // First, try to get the quiz document
        const quizDoc = await Quiz.findById(quizId);
        
        if (!quizDoc) {
            return <div>Quiz not found</div>;
        }

        // Get questions directly by quizId
        const questions = await Question.find({ quizId })
            .populate('answers')
            .lean(); // Convert to plain JavaScript objects
        
        if (!questions || questions.length === 0) {
            return <div>No questions found for this quiz</div>;
        }

        // Create a clean quiz object
        const quiz = {
            _id: quizId,
            name: quizDoc.name || "Quiz",
            description: quizDoc.description || "Quiz",
            questions: questions.map(q => ({
                _id: q._id.toString(),
                questionText: q.questionText,
                answers: (q.answers || []).map(a => ({
                    _id: a._id.toString(),
                    answerText: a.answerText,
                    isCorrect: a.isCorrect
                }))
            }))
        };

        console.log("Quiz data prepared:", {
            id: quiz._id,
            name: quiz.name,
            questionCount: quiz.questions.length
        });

        return <QuizQuestions quiz={quiz} />;
        
    } catch (error) {
        console.error("Error loading quiz:", error);
        return <div>Error loading quiz</div>;
    }
}

export default page;