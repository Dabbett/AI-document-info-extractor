import UploadDoc from "../UploadDoc"
import { colors, backgrounds } from "@/lib/design-system";

const page = () => {
  return (
    <div className={backgrounds.main}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20  h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40  h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen mt-0 pt-0 flex items-center justify-center p-10">
        <div className="text-center">
          <h2 className={`text-xl md:text-2xl font-bold ${colors.text.primary} py-4 md:py-2`}>What do you want to be quizzed about today?</h2>
          <UploadDoc standalone={false} />
        </div>
      </div>
    </div>
  )
}

export default page