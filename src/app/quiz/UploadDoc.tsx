"use client"

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react"

const UploadDoc = () => {
const [document, setDocument] = useState<Blob | File | null | undefined>(null);
const [isLoading, setIsLoading] = useState<boolean>(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", document as Blob);
    try{
        const res = await fetch("api/quiz/generate", {
            method: "POST",
            body: formData
        });
        if(res.status == 200) {
            console.log("quiz generated successfully")
        } 
    } catch (e) {
        console.log("error while generating", e);
    }
    setIsLoading(false);
}

  return (
    <div className="w-full">
        <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="document" className="bg-secondary w-full flex h-20 rounded-md border-2 border-dotted border-blue-900 relative">
                <div className="absolute inset-0 m-auto flex justify-center items-center"> {document && document?.name ? document.name: "Drag a file"}</div>
                <input type="file" id="document" className=" relative block w-full h-full z-50 opacity-0 mt-2" onChange={(e) => setDocument(e?.target?.files?.[0])}/>
            </label>
            <Button size="lg" className="mt-2" type="submit">Generate Quiz</Button>
        </form>
    </div>
  )
}

export default UploadDoc