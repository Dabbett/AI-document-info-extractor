"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeftIcon, X, CheckCircle, XCircle } from "lucide-react";
import ResultCard from "../ResultCard";
import QuizSubmission from "../QuizSubmission";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { backgrounds, buttonVariants, colors, animationDelays } from "@/lib/design-system";

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

export default function SessionBasedQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{questionId: string, answerId: string}[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  // Load quiz from session storage on component mount
  useEffect(() => {
    const sessionQuiz = sessionStorage.getItem('currentQuiz');
    if (sessionQuiz) {
      setQuiz(JSON.parse(sessionQuiz));
    } else {
      // Redirect to quiz generation if no quiz in session
      router.push('/quiz/new');
    }
  }, [router]);

      if (!quiz) {
      return (
        <div className={`${backgrounds.main} flex items-center justify-center`}>
          <div className={`${backgrounds.glass} p-12 text-center`}>
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className={colors.text.primary}>Loading quiz...</p>
          </div>
        </div>
      );
    }

  const { questions } = quiz;

  const handleNext = () => {
    if(!started) {
      setStarted(true);
      return;
    }
    if(currentQuestion < questions.length -1) {
      setCurrentQuestion(currentQuestion +1);
      setSelectedAnswer(null);
    } else {
      setSubmitted(true);
      // Clear session when quiz is completed
      sessionStorage.removeItem('currentQuiz');
      return;
    }
  }

  const handleAnswer = (answer: Answer, questionId: string) => {
    setSelectedAnswer(answer._id);
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

  const handlePressPrev = () => {
  if(currentQuestion !==0) {
    setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion -1)
    setSelectedAnswer(null);
  }
}

  const handleExit = () => {
    // Clear session and redirect
    sessionStorage.removeItem('currentQuiz');
    router.push('/')
  }

  const scorePercentage: number = Math.round((score/ questions.length)*100);
  const isCorrect: boolean | null = selectedAnswer ? questions[currentQuestion].answers.find((answer) => answer._id === selectedAnswer)?.isCorrect ?? null : null;

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

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header 
          className="backdrop-blur-xl bg-white/10 border-b border-white/20 p-2 md:p-4 sticky top-0 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <motion.button
              onClick={handlePressPrev}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>
            
            <div className="flex-1 mx-4">
              <ProgressBar value={(currentQuestion / questions.length)*100}/>
            </div>
            
            <motion.button
              onClick={handleExit}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="p-6">
          <motion.div 
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!started ? (
              <motion.div 
                className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                  Scan. Quiz. Learn.
                </h1>
                <p className={`text-xl ${colors.text.secondary} mb-8`}>
                  Ready to test your knowledge? Let&apos;s begin!
                </p>
                <motion.button
                  onClick={handleNext}
                  className={buttonVariants.primary.base}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={buttonVariants.primary.content}>Start Quiz</span>
                  <div className={buttonVariants.primary.overlay}></div>
                  <div className={buttonVariants.primary.shine}></div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className={`${backgrounds.glass} p-6 md:p-8`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className={`text-2xl font-bold ${colors.text.primary} mb-4 leading-relaxed`}>
                      {questions[currentQuestion].questionText}
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      {questions[currentQuestion].answers.map((answer, index) => {
                        const isSelected = selectedAnswer === answer._id;
                        const isCorrectAnswer = answer.isCorrect;
                        
                        return (
                          <motion.button
                            key={answer._id}
                            disabled={!!selectedAnswer}
                            onClick={() => handleAnswer(answer, questions[currentQuestion]._id)}
                            className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 border-2 ${
                              isSelected
                                ? isCorrectAnswer
                                  ? `${colors.status.success.bg} ${colors.status.success.border} ${colors.status.success.text}`
                                  : `${colors.status.error.bg} ${colors.status.error.border} ${colors.status.error.text}`
                                : `${colors.glass.bg} ${colors.glass.border} ${colors.glass.hover} ${colors.text.primary}`
                            } disabled:cursor-not-allowed`}
                            whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                            whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-medium">{answer.answerText}</span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {isCorrectAnswer ? (
                                    <CheckCircle className={`w-6 h-6 ${colors.status.success.icon}`} />
                                  ) : (
                                    <XCircle className={`w-6 h-6 ${colors.status.error.icon}`} />
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Result Card */}
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResultCard
                      isCorrect={isCorrect}
                      correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""}
                    />
                  </motion.div>
                )}

                {/* Next Button */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`${buttonVariants.primary.base} disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={selectedAnswer ? { scale: 1.05 } : {}}
                    whileTap={selectedAnswer ? { scale: 0.95 } : {}}
                  >
                    <span className={buttonVariants.primary.content}>
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </span>
                    <div className={buttonVariants.primary.overlay}></div>
                    <div className={buttonVariants.primary.shine}></div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
} 