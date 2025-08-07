"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeftIcon, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";
import { useRouter } from "next/navigation";
import { saveSubmission } from "@/app/actions/saveSubmissions";

interface Answer {
  _id: string;
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  questionText: string;
  answers: Answer[];
}

interface Quiz {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

interface Props {
  quiz: Quiz;
}

export default function QuizQuestions(props: Props) {
  const { questions } = props.quiz;
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{questionId: string, answerId: string}[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

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
  }

  const handleAnswer = (answer: Answer, questionId: string) => {
    const newUserAnswersArr = [...userAnswers, {
      questionId,
      answerId: answer._id,
  }];
    setUserAnswers(newUserAnswersArr)
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
  }

  const handleSubmit = async () => {
    try {
      const subId = await saveSubmission({score, quizId: props.quiz._id}, props.quiz._id);
    } catch (e) {
      console.log(e)
    }
  }

  const handlePressPrev = () => {
  if(currentQuestion !==0) {
    setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion -1)
  }
}

  const handleExit = () => {
    router.push('/')
  }

  const scorePercentage: number = Math.round((score/ questions.length)*100);
  const selectedAnswer: string | null | undefined = userAnswers.find((item) => item.questionId === questions[currentQuestion]._id)?.answerId;
  const isCorrect: boolean | null | undefined = questions[currentQuestion].answers.findIndex((answer) => answer._id === selectedAnswer) !== -1 ? questions[currentQuestion].answers.find((answer) => answer._id === selectedAnswer)?.isCorrect : null;

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
    <div className="flex flex-col flex-1 max-w-screen-lg min-h-screen">
      <div  className="position-sticky top-0 z-10 shadow-md py-0 px-2"> 
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button size="icon" variant="outline" onClick={handlePressPrev}><ChevronLeftIcon/></Button>
          <ProgressBar value={(currentQuestion / questions.length)*100}/> 
          <Button size="icon" variant="outline" onClick={handleExit}>
            <X />
            </Button>
        </header>
      </div>
    <main className="flex justify-center flex-1 px-4">
      {!started? <h1 className="text-4xl font-bold">Scan. Quiz. Learn.</h1>: (
      <div> 
        <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
        <div className="grid grid-cols-1 gap-3 mt-1">
          {
            questions[currentQuestion].answers.map(answer => {
              const variant = selectedAnswer === answer._id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                return (
                <Button key={answer._id} disabled={!!selectedAnswer} variant={variant} size="xl" onClick={() => handleAnswer(answer, questions[currentQuestion]._id)} className="disabled:opacity-100">
                 <p className="whitespace-normal">{answer.answerText}</p> 
                </Button>
                )
            })
          }
        </div>
        </div>)}
    </main>
    <footer className="footer pb-9 flex flex-col px-2 relative mb-20">
      <ResultCard
        isCorrect={isCorrect}
        correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""}/>
      <Button
        variant="neo"
        size="lg" 
        onClick={handleNext}
        
        >
          {!started ? 'Start' : 'Next'}</Button>
    </footer>
    </div>
  )
}
