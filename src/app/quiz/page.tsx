"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeftIcon, ChevronLeftSquareIcon, ChevronRightIcon, ChevronRightSquareIcon, X } from "lucide-react";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      { answerText: "A library for building user interfaces", isCorrect: true, id:1},
      { answerText: "A front-end framework", isCorrect: false, id:2},
      { answerText: "A back-end framework", isCorrect: false, id:3},
      { answerText: "A database", isCorrect: false, id:4}
    ]
  },
  {
    questionText: "What is JSX?",
    answers: [
      { answerText: "aqwerqwerqwer", isCorrect: true, id:1},
      { answerText: "qwerqwerqwerqwer", isCorrect: false, id:2},
      { answerText: "awerwer", isCorrect: false, id:3},
      { answerText: "wer", isCorrect: false, id:4}
    ]
  }
]

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean| null>(null);
  

  const handleNext = () => {
    if(!started) {
      setStarted(true);
      return;
    }
    if(currentQuestion < questions.length -1) {
      setCurrentQuestion(currentQuestion +1);
    }
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score +1);
    }
    setIsCorrect(isCurrentCorrect)
  }

  return (
    <div className="flex flex-col flex-1">
      <div  className="position-sticky top-0 z-10 shadow-md py-4 w-full"> 
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button size="icon" variant="outline"><ChevronLeftIcon/> </Button>
          <ProgressBar value={(currentQuestion/questions.length)*100}/> 
          <Button size="icon" variant="outline"><X/></Button>
          {/* <Button size="icon" variant="outline"><ChevronRightIcon/> </Button> */}
          <ProgressBar value={(currentQuestion/questions.length)*100}/> 
        </header>
      </div>
    <main className="flex justify-center flex-1">
      {!started? <h1 className="text-6xl font-bold">Scan. Quiz. Learn.</h1>:
      <div> 
        <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {
            questions[currentQuestion].answers.map(answer => {
                return (
                <Button key={answer.id} variant={"secondary"}>
                  {answer.answerText}
                </Button>
                )
            })
          }
        </div>
        </div>}
    </main>
    <footer className="footer pb-9 px-6 relative mb-0">
      <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
    </footer>
    </div>
  )
}
