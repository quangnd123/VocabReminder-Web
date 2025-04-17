import { Button } from "@/src/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { createPhrase } from "@/src/lib/requests"
import { useState } from "react"
import { LanguageCombobox} from "@/src/components/language-combobox";
import { LanguageData } from "@/src/types/type"
import languagesJson from "@/public/languages.json"
import { useSession } from "next-auth/react"
import { PhraseData } from "@/src/types/type"
import { toast } from "sonner"

const languagesData: LanguageData[]  = languagesJson 

export function AddPhraseDialog(
    {
        phrasesData,
        setPhrasesData,
    }:
    {
        phrasesData: PhraseData[],
        setPhrasesData: React.Dispatch<React.SetStateAction<PhraseData[]>>, 
    }
) {
    const {data: session} = useSession()
    if (!session?.user) return null 
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [phrase, setPhrase] = useState<string>("");
    const [sentence, setSentence] = useState<string>("");
    const [phraseLanguageData, setPhraseLanguageData] = useState<LanguageData | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>("")
    
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen) {
          // Reset when dialog opens
          setPhrase("")
          setSentence("")
          setStatusMessage("")
          setLoading(false)
        }
      }

    const createPhraseHandler = async ()=>{
        const trimmedPhrase = phrase.trim()

        const finalSentence = sentence || trimmedPhrase
        
        if (phrase === "") {
            setStatusMessage("Error: Phrase cannot be empty")
            return;
        }

        const phraseIdx = finalSentence.indexOf(trimmedPhrase)
        if (phraseIdx===-1){
            setStatusMessage("Error: Cannot find the phrase in the sentence")
            return;
        }

        setLoading(true)
        const response = await createPhrase({
            user_id: session.user.id!,
            phrase: trimmedPhrase,
            sentence: finalSentence,
            phrase_idx: phraseIdx,
            language: phraseLanguageData?.code
        })

        if(response.status === "success"){
            setPhrasesData([...phrasesData, response.data!])
            setOpen(false)
            toast("Success",{
                description: "Vocab Added!"
              })
        }    
        else{
            setStatusMessage("Error: " + response.error!)
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
            <Button variant="outline">
                <PlusIcon />
                Add Vocab
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Vocab</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phrase" className="text-right">
                    Vocab
                    </Label>
                    <Input
                    id="phrase"
                    className="col-span-3"
                    onChange={(e)=>{
                        setPhrase(e.target.value);
                        
                    }}
                    />
                </div>
                <div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sentence" className="text-right">
                        Sentence
                    </Label>
                    <Input
                        id="sentence"
                        className="col-span-3"
                        onChange={(e)=>setSentence(e.target.value)}
                    />
                    </div>
                    <p className="text-sm text-muted-foreground">A sentence (context of the vocab) should be added for an accuracy boost of ~ 25%! If not, it is set to the vocab itself.</p>
                </div>
                
            <LanguageCombobox   
                label="Language" 
                description="Language will be auto detected if not specified." 
                languagesData={languagesData}
                chosenLanguageData={phraseLanguageData} 
                setChosenLanguageData={setPhraseLanguageData}
            />
            </div>
            <DialogFooter>
            <Button onClick={() => createPhraseHandler()} disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                    ) : "Add"}
            </Button>
            </DialogFooter>
            {statusMessage && (
                <div className="text-center my-2">
                    <p
                    className={`text-sm px-3 py-1 rounded-md text-red-700 bg-red-100`}
                    >
                    {statusMessage}
                    </p>
                </div>
            )}
        </DialogContent>
        </Dialog>
    )
}