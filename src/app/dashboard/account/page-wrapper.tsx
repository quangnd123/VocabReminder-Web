'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { GenericCombobox } from "@/components/generic-combobox"
import { GenericMultiCombobox } from "@/components/generic-multi-combobox"
import languagesJson from "@/../public/languages.json"
import { LanguageData } from "@/types/type"
import { Badge } from "@/components/ui/badge"
import { updateUser } from "@/lib/requests"

const languagesData: LanguageData[]  = languagesJson 

function areListsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((val, i) => val === sortedB[i])
}

export default function ProfilePageClient() {
  const { data: session, update } = useSession()
  const user = session?.user

  const reading = (languagesData as LanguageData[]).filter(languageData => user?.reading_languages.includes(languageData.code))
  const learning = (languagesData as LanguageData[]).filter(languageData => user?.learning_languages.includes(languageData.code))
  const llm_language = (languagesData as LanguageData[]).find(languageData => user?.llm_response_language === languageData.code)

  const [name, setName] = useState(user?.name ?? "")
  const [readingLanguagesData, setReadingLanguagesData] = useState<LanguageData[]>(reading)
  const [learningLanguagesData, setLearningLanguagesData] = useState<LanguageData[]>(learning)
  const [llmLanguageData, setLLMLanguageData] = useState<LanguageData | null>(llm_language ?? null)
  const [unallowedURLs, setUnallowedURLs] = useState(user?.unallowed_urls ?? [])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState<boolean>(false)

  if (!user) return null

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const addUrl = () => {
    const trimmed = input.trim()
    if (!trimmed || !isValidUrl(trimmed)) {
      toast("ERROR", {
        description: `${trimmed} is not a valid URL. For example: 'https://example.com' is valid, 'google.com' is not.`,
      })
      return
    }
    if (!unallowedURLs.includes(trimmed)) {
      setUnallowedURLs([...unallowedURLs, trimmed])
      setInput("")
    }
  }

  const removeUrl = (urlToRemove: string) => {
    setUnallowedURLs(unallowedURLs.filter(url => url !== urlToRemove))
  }

  const updateUserOnClick = async () => {
    const readingLanguages = Array.from(new Set(readingLanguagesData.map(data => data.code)))
    const learningLanguages = Array.from(new Set(learningLanguagesData.map(data => data.code)))
    const llmLanguage = llmLanguageData?.code ?? null

    if (
      areListsEqual(unallowedURLs, user.unallowed_urls) &&
      areListsEqual(readingLanguages, user.reading_languages) &&
      areListsEqual(learningLanguages, user.learning_languages) &&
      llmLanguage === user.llm_response_language &&
      name === user.name
    ) {
      toast("Success", { description: "Profile Unchanged" })
      return
    }

    setLoading(true)
    const response = await updateUser({
      id: user.id!,
      name,
      reading_languages: readingLanguages,
      learning_languages: learningLanguages,
      llm_response_language: llmLanguage,
      unallowed_urls: unallowedURLs
    })

    if (response.status === "success") {
      await update({ user: response.data })
      toast("Success", { description: "Profile Updated" })
    } else {
      toast("Error", { description: response.error })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex items-center w-full gap-4">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex items-center w-full gap-4">
        <Label>Email</Label>
        <Input value={user.email || ""} disabled />
      </div>

      <GenericMultiCombobox
        label="Learning Languages"
        description="Your vocab only in these languages will be reminded."
        options={languagesData}
        selected={learningLanguagesData}
        setSelected={setLearningLanguagesData}
        getLabel={lang => lang.name}
        getKey={lang => lang.code}
      />

      <GenericMultiCombobox
        label="Reading Languages"
        description="Languages of the content you're reading on webs."
        options={languagesData}
        selected={readingLanguagesData}
        setSelected={setReadingLanguagesData}
        getLabel={lang => lang.name}
        getKey={lang => lang.code}
      />

      <GenericCombobox
        label="LLM Response Language"
        description="Reminders for your vocab and Word translation will be generated in this language."
        options={languagesData}
        selected={llmLanguageData}
        setSelected={setLLMLanguageData}
        getLabel={lang => lang.name}
        getKey={lang => lang.code}
      />

      <div className="space-y-4">
        <Label htmlFor="url">Add unallowed URL</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addUrl()
              }
            }}
          />
          <Button onClick={addUrl}>Add</Button>
        </div>

        {unallowedURLs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {unallowedURLs.map((url) => (
              <Badge
                key={url}
                variant="outline"
                className="cursor-pointer"
                onClick={() => removeUrl(url)}
              >
                {url} ✕
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button onClick={updateUserOnClick} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Please wait
          </>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  )
}
