import React from 'react'
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { colors } from "@/lib/design-system";

type Props = {
  isCorrect: boolean | null | undefined,
  correctAnswer: string | undefined
}

const ResultCard = (props: Props) => {
  const { isCorrect } = props;

  if (isCorrect === null || isCorrect === undefined) {
    return null
  }

  const text = isCorrect ? 'Correct!' : 'Incorrect! The correct answer is: ' + props.correctAnswer;

  return (
    <motion.div 
      className={`backdrop-blur-lg rounded-2xl p-6 text-center border-2 ${
        isCorrect 
          ? `${colors.status.success.bg} ${colors.status.success.border} ${colors.status.success.text}` 
          : `${colors.status.error.bg} ${colors.status.error.border} ${colors.status.error.text}`
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        {isCorrect ? (
          <CheckCircle className={`w-6 h-6 ${colors.status.success.icon}`} />
        ) : (
          <XCircle className={`w-6 h-6 ${colors.status.error.icon}`} />
        )}
        <span className="text-xl font-semibold">{text}</span>
      </div>
    </motion.div>
  )
}

export default ResultCard