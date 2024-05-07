"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeftIcon, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";
import { InferSelectModel } from "drizzle-orm";
import { questionAnswers, questions as DbQuestions, quizzes } from "@/db/schema";

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof DbQuestions> & { answers: Answer[]};
type Quiz = InferSelectModel<typeof quizzes> & { questions: Question[]};

type Props = {
 quiz: Quiz
}

export default function QuizQuestions(props: Props) {
  const { questions } = props.quiz;
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean| null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  

  const handleNext = () => {
    if(!started) {
      setStarted(true);
      return;
    }
    if(currentQuestion < questions.length -1) {
      setCurrentQuestion(currentQuestion +1);
    } else {
      setSubmitted(true);
      return;
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  }

  const handleAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
    setIsCorrect(isCurrentCorrect)
  }

  const scorePercentage: number = Math.round((score/ questions.length)*100);

  if(submitted) {
    return (
      <QuizSubmission
      score = {score}
      scorePercentage={scorePercentage}
      totalQuestions={questions.length}
      />
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div  className="position-sticky top-0 z-10 shadow-md py-4 w-full"> 
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button size="icon" variant="outline"><ChevronLeftIcon/></Button>
          <ProgressBar value={(currentQuestion / questions.length)*100}/> 
          <Button size="icon" variant="outline">
            <X />
            </Button>
        </header>
      </div>
    <main className="flex justify-center flex-1">
      {!started? <h1 className="text-4xl font-bold">Scan. Quiz. Learn.</h1>: (
      <div> 
        <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {
            questions[currentQuestion].answers.map(answer => {
              const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                return (
                <Button key={answer.id} variant={"neoOutline"} size="xl" onClick={() => handleAnswer(answer)}>
                  {answer.answerText}
                </Button>
                )
            })
          }
        </div>
        </div>)}
    </main>
    <footer className="footer pb-9 px-6 relative mb-0">
      <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""}/>
      <Button variant="neo" size="lg" onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
    </footer>
    </div>
  )
}
