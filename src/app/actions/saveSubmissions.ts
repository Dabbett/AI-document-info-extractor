"use server";

import { connectDB } from "@/db";
import { QuizSubmission } from "@/db/schema";

interface Submission {
  score: number;
  quizId: string;
}

export async function saveSubmission(sub: Submission, quizId: string) {
  await connectDB();
  const { score } = sub;

  const newSubmission = new QuizSubmission({
    score,
    quizId,
  });
  
  const savedSubmission = await newSubmission.save();
  return savedSubmission._id.toString();
}