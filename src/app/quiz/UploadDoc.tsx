"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Upload, FileText, Sparkles } from "lucide-react";
import { backgrounds, buttonVariants, colors } from "@/lib/design-system";

interface UploadDocProps {
  standalone?: boolean;
}

const UploadDoc = ({ standalone = true }: UploadDocProps) => {
  const [document, setDocument] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError("Please upload the document first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", document as Blob);
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        body: formData
      });
      if (res.status === 200) {
        const data = await res.json();
        
        // Store quiz data in session storage instead of redirecting
        sessionStorage.setItem('currentQuiz', JSON.stringify(data.quiz));
        
        // Redirect to session-based quiz page
        router.push('/quiz/session-based');
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to generate quiz");
      }
    } catch (e) {
      console.log("error while generating", e);
      setError("Network error occurred");
    }
    setIsLoading(false);
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError("")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setDocument(files[0]);
      if (error) {
        setError("");
      }
    }
  };

      const content = (
    <motion.div 
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoading ? (
        <motion.div 
          className={`${backgrounds.glass} p-12 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${colors.text.primary} mb-2`}>Generating Your Quiz</h2>
              <p className={colors.text.secondary}>AI is analyzing your document and creating intelligent questions...</p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.form 
          className={`${backgrounds.glass} p-12`}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className={`text-3xl font-bold ${colors.text.primary} mb-4`}>Upload Your Document</h1>
            <p className={colors.text.secondary}>Drop your PDF here and let AI create a personalized quiz</p>
          </div>

          <div className="space-y-6">
            <motion.label 
              htmlFor="document" 
              className={`block w-full h-32 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                isDragOver 
                  ? 'border-purple-400 bg-purple-500/20' 
                  : 'border-white/30 hover:border-purple-400 hover:bg-white/5'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <Upload className={`w-8 h-8 mb-3 transition-colors duration-300 ${
                  isDragOver ? 'text-purple-300' : 'text-white/60 group-hover:text-purple-300'
                }`} />
                <div className="text-sm">
                  {document && document?.name ? (
                    <span className="text-purple-300 font-medium">{document.name}</span>
                  ) : (
                    <span className="text-white/80">
                      <span className="font-medium">Click to upload</span> or drag and drop
                      <br />
                      <span className="text-xs text-white/60">PDF files only</span>
                    </span>
                  )}
                </div>
              </div>
              <input 
                type="file" 
                id="document" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleDocumentUpload}
                accept=".pdf"
              />
            </motion.label>

            {error && (
              <motion.div 
                className={`${colors.status.error.bg} ${colors.status.error.border} rounded-xl p-4 ${colors.status.error.text}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={!document}
                className={`w-full ${buttonVariants.primary.base} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className={buttonVariants.primary.content}>
                  <Sparkles className="w-5 h-5" />
                  Generate Quiz
                </span>
                <div className={buttonVariants.primary.overlay}></div>
                <div className={buttonVariants.primary.shine}></div>
              </button>
            </motion.div>
          </div>
        </motion.form>
      )}
    </motion.div>
  );

  if (standalone) {
    return (
      <div className={backgrounds.main}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-10">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

export default UploadDoc;