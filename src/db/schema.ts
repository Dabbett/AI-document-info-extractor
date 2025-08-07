import mongoose, { Schema, Document } from 'mongoose';

// Quiz Schema
export interface IQuiz extends Document {
  name: string;
  description: string;
  userID?: string;
  questions?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema = new Schema<IQuiz>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userID: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, {
  timestamps: true
});

// Question Schema
export interface IQuestion extends Document {
  questionText: string;
  quizId: mongoose.Types.ObjectId;
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
}, {
  timestamps: true
});

// Answer Schema
export interface IAnswer extends Document {
  answerText: string;
  isCorrect: boolean;
  questionId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
}, {
  timestamps: true
});

// Quiz Submission Schema
export interface IQuizSubmission extends Document {
  quizId: mongoose.Types.ObjectId;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSubmissionSchema = new Schema<IQuizSubmission>({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true }
}, {
  timestamps: true
});

// Create and export models
export const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
export const Question = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
export const Answer = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);
export const QuizSubmission = mongoose.models.QuizSubmission || mongoose.model<IQuizSubmission>('QuizSubmission', QuizSubmissionSchema);