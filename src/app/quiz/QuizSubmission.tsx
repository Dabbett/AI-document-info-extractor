import { useEffect } from "react";
import Bar from "@/components/Bar";
import Image from "next/image";
import { useReward } from "react-rewards";
import { motion } from "framer-motion";
import { Trophy, Target, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { backgrounds, buttonVariants, colors } from "@/lib/design-system";

type Props = {
    scorePercentage: number, 
    score: number,
    totalQuestions: number
}

const QuizSubmission = (props: Props) => {
    const { scorePercentage, score, totalQuestions } = props;
    const { reward } = useReward('rewardId', "confetti");
    const router = useRouter();

    useEffect(() => {
        if(scorePercentage === 100) {
            reward();
        }
    }, [scorePercentage, reward])

    const handleGoHome = () => {
        router.push('/');
    };

    const handleNewQuiz = () => {
        router.push('/quiz/new');
    };

    return (
        <div className={backgrounds.main}>
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 flex flex-col h-screen justify-center items-center p-6">
                <motion.div 
                    className={`${backgrounds.glass} p-12 text-center max-w-2xl w-full`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {scorePercentage === 100 ? (
                            <Trophy className="w-10 h-10 text-white" />
                        ) : (
                            <Target className="w-10 h-10 text-white" />
                        )}
                    </motion.div>

                    <motion.h2 
                        className={`text-4xl font-bold ${colors.text.primary} mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Quiz Complete!
                    </motion.h2>

                    <motion.p 
                        className={`text-2xl ${colors.text.secondary} mb-6`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        You Scored: <span className={`font-bold ${colors.text.primary}`}>{scorePercentage}%</span>
                    </motion.p>

                    {scorePercentage < 70 && (
                        <motion.p 
                            className={`text-sm ${colors.text.muted} mb-4 italic`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                        >
                            {(() => {
                                const quotes = [
                                    "Not great! But there's always... something other than this?",
                                    "Hey, look at you! I'm sure there are things you aren't that bad at. (Not this of course)",
                                    "Well, at least you tried.. That's something!",
                                    "Don't worry, even Einstein had bad days. (Probably not this many though)",
                                    "You know what they say - practice makes... well, you get the idea",
                                    "On the bright side, you're definitely not the worst! (Probably)",
                                    "Remember: Rome wasn't built in a day. Neither was your knowledge of this topic, apparently",
                                    "Someone has to be the worst -- today that's you -- but tomorrow it could be you also.",
                                    "At least you're consistent... consistently wrong, but consistent!",
                                    "You know what they say -- actually you proabaly don't know that either.",
                                    "Think of this as character building. Your character is definitely being built right now",
                                    "I'm saying this with all the love you deserve -- you should really be ashamed of yourself"
                                ];
                                return quotes[Math.floor(Math.random() * quotes.length)];
                            })()}
                        </motion.p>
                    )}

                    {scorePercentage === 100 ? (
                        <motion.div 
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <p className={`text-xl ${colors.status.success.text} mb-4`}>🎉 Perfect Score! Congratulations! 🎉</p>
                            <div className="flex justify-center mb-6">
                                <Image src="/images/Bot-Thumbs-Up.png" alt="Robot Giving a Thumbs Up" width={300} height={300}/>
                            </div>
                            <span id="rewardId"/>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <div className="flex flex-row gap-8 justify-center"> 
                                <div className="text-center">
                                    <Bar percentage={scorePercentage} color="green" />
                                    <p className={`${colors.status.success.text} mt-2`}>{score} Correct</p>
                                </div>
                                <div className="text-center">
                                    <Bar percentage={100-scorePercentage} color="red" />
                                    <p className={`${colors.status.error.text} mt-2`}>{totalQuestions - score} Incorrect</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div 
                        className="flex gap-4 justify-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.button
                            onClick={handleGoHome}
                            className={`${buttonVariants.primary.base} flex items-center gap-2`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Home className="w-4 h-4" />
                            <span className={buttonVariants.primary.content}>Go Home</span>
                            <div className={buttonVariants.primary.overlay}></div>
                            <div className={buttonVariants.primary.shine}></div>
                        </motion.button>

                        <motion.button
                            onClick={handleNewQuiz}
                            className={`${buttonVariants.secondary.base} flex items-center gap-2`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Target className="w-4 h-4" />
                            <span className={buttonVariants.secondary.content}>New Quiz</span>
                            <div className={buttonVariants.secondary.overlay}></div>
                            <div className={buttonVariants.secondary.shine}></div>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default QuizSubmission;