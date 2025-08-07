"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeftIcon, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";
import { backgrounds, buttonVariants, colors } from "@/lib/design-system";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      { answerText: "A library for building user interfaces", isCorrect: true, id: 1 },
      { answerText: "A front-end framework", isCorrect: false, id: 2 },
      { answerText: "A back-end framework", isCorrect: false, id: 3 },
      { answerText: "A database", isCorrect: false, id: 4 }
    ]
  },
  {
    questionText: "What is JSX?",
    answers: [
      { answerText: "JavaScript XML", isCorrect: true, id: 1 },
      { answerText: "JavaScript", isCorrect: false, id: 2 },
      { answerText: "JavaScript and XML", isCorrect: false, id: 3 },
      { answerText: "JavaScript and HTML", isCorrect: false, id: 4 }
    ]
  },
  {
    questionText: "What is the virtual DOM?",
    answers: [
      { answerText: "A virtual representation of the DOM", isCorrect: true, id: 1 },
      { answerText: "A real DOM", isCorrect: false, id: 2 },
      { answerText: "A virtual representation of the browser", isCorrect: false, id: 3 },
      { answerText: "A virtual representation of the server", isCorrect: false, id: 4 }
    ]
  }
];

export default function Home() {
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

  const handleAnswer = (answer: any) => {
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
    <div className={backgrounds.main}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/10 border-b border-white/20 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button size="icon" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
            <div className="flex-1 mx-4">
              <ProgressBar value={(currentQuestion / questions.length)*100}/>
            </div>
            <Button size="icon" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            {!started ? (
              <div className="text-center">
                <h1 className={`text-5xl font-bold ${colors.text.primary} mb-8`}>Scan. Quiz. Learn.</h1>
                <button 
                  onClick={handleNext}
                  className={buttonVariants.primary.base}
                >
                  <span className={buttonVariants.primary.content}>Start Quiz</span>
                  <div className={buttonVariants.primary.overlay}></div>
                  <div className={buttonVariants.primary.shine}></div>
                </button>
              </div>
            ) : (
              <div className={`${backgrounds.glass} p-12`}>
                <h2 className={`text-3xl font-bold ${colors.text.primary} mb-8`}>{questions[currentQuestion].questionText}</h2>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {questions[currentQuestion].answers.map(answer => {
                    const isSelected = selectedAnswer === answer.id;
                    const isCorrectAnswer = answer.isCorrect;
                    
                    return (
                      <button
                        key={answer.id}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswer(answer)}
                        className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 border-2 ${
                          isSelected
                            ? isCorrectAnswer
                              ? `${colors.status.success.bg} ${colors.status.success.border} ${colors.status.success.text}`
                              : `${colors.status.error.bg} ${colors.status.error.border} ${colors.status.error.text}`
                            : `${colors.glass.bg} ${colors.glass.border} ${colors.glass.hover} ${colors.text.primary}`
                        } disabled:cursor-not-allowed`}
                      >
                        <span className="text-lg font-medium">{answer.answerText}</span>
                      </button>
                    );
                  })}
                </div>
                
                {selectedAnswer && (
                  <ResultCard 
                    isCorrect={isCorrect} 
                    correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""}
                  />
                )}
                
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`${buttonVariants.primary.base} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className={buttonVariants.primary.content}>
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </span>
                    <div className={buttonVariants.primary.overlay}></div>
                    <div className={buttonVariants.primary.shine}></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
