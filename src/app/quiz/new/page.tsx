import UploadDoc from "../UploadDoc"
import { colors } from "@/lib/design-system";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
              <div className="text-center">
          <h2 className={`text-3xl font-bold ${colors.text.primary} mb-8`}>What do you want to be quizzed about today?</h2>
          <UploadDoc standalone={false} />
        </div>
    </div>
  )
}

export default page