"use client" 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/quiz/new');
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center m-10">
      <main className="flex flex-col items-center">
        <div className="text-center">
          {/* Uncomment this if you want to include the image */}
          {/* <Image src="/images/Bot-Thumbs-Up.png" alt="Robot Giving a Thumbs Up" width={400} height={400} /> */}
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl">Test your knowledge of ANYTHING!</h1>
            <p className="text-blue-400"> Upload a pdf and generate a quiz using artificial intelligence.</p>
            <Button variant={"neoSuccess"} size="xl" onClick={handleGetStarted}>Get Started</Button>
            
          </div>
        </div>
      </main>
    </div>
  );
}
