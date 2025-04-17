'use client'

import { useState } from "react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { LanguageCombobox } from "@/src/components/language-combobox"
import { LanguagesCombobox } from "@/src/components/languages-combobox"
import languagesJson from "@/public/languages.json"
import { LanguageData } from "@/src/types/type"
import { updateUser } from "@/src/lib/requests"

const languagesData: LanguageData[]  = languagesJson 

function areListsEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false

  const sortedA = [...a].sort()
  const sortedB = [...b].sort()

  return sortedA.every((val, i) => val === sortedB[i])
}

export default function ProfilePage() {
  const { data: session, update } = useSession()
  if (!session || !session.user) return null;
  
  const user = session.user 
  const read = (languagesData as LanguageData[]).filter(languageData => user.reading_languages.includes(languageData["code"]))
  const learning = (languagesData as LanguageData[]).filter(languageData => user.learning_languages.includes(languageData["code"]))
  const reminding = (languagesData as LanguageData[]).find(languageData => user.reminding_language === languageData["name"])
  const [name, setName] = useState(user.name ?? "")
  const [readingLanguagesData, setReadingLanguagesData] = useState<LanguageData[]>(read)
  const [learningLanguagesData, setLearningLanguagesData] = useState<LanguageData[]>(learning)
  const [remindingLanguageData, setRemindingLanguageData] = useState<LanguageData | null>(reminding?? null)
  
  const [loading, setLoading] = useState<boolean>(false);

  const updateUserOnClick = async ()=>{
    // profile unchanged
    const readingLanguages = Array.from(new Set(readingLanguagesData.map(data => data.code)))
    const learningLanguages = Array.from(new Set(learningLanguagesData.map(data => data.code)))
    const remindingLanguage = remindingLanguageData?.["name"] ?? null
    if (areListsEqual(readingLanguages,user.reading_languages) && 
      areListsEqual(learningLanguages, user.learning_languages) && 
      remindingLanguage=== user.reminding_language &&
      name === user.name
    ){
      toast("Success",{
        description: "Profile Unchanged"
      })
      return;
    }

    setLoading(true)

    const response = await updateUser({
      id: user.id!,
      name: name,
      reading_languages: readingLanguages,
      learning_languages: learningLanguages,
      reminding_language: remindingLanguage
    })
    
    if(response.status==="success"){
      await update({user: response.data})
        toast("Success",{
          description: "Profile Updated"
        })
    }
    else{
      toast("Error", {
        description: response.error,
      });
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex items-center w-full max-w-sm gap-4">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex items-center w-full max-w-sm gap-4">
        <Label>Email</Label>
        <Input value={user.email || ""} disabled />
      </div>

      <LanguagesCombobox
        label="Learning Languages"
        description="Your vocab only in these languages will be reminded."
        languagesData={languagesData} 
        chosenLanguagesData={learningLanguagesData} 
        setChosenLanguagesData={setLearningLanguagesData} 
      />

      <LanguagesCombobox
        label="Reading Languages"
        description="Languages of the content you're reading on webs."
        languagesData={languagesData} 
        chosenLanguagesData={readingLanguagesData} 
        setChosenLanguagesData={setReadingLanguagesData} 
      />

      <LanguageCombobox
        label="Reminding Language"
        description="Reminders for your vocab will be generated in this language."
        languagesData={languagesData} 
        chosenLanguageData={remindingLanguageData} 
        setChosenLanguageData={setRemindingLanguageData} 
      />

      <Button onClick={updateUserOnClick} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
              Please wait
          </>
        )
          : "Save"}
      </Button>
    </div>
  )
}
