import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { deletePhrases } from "@/src/lib/requests"
import { PhraseData } from "@/src/types/type"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"
export const DeletePhrasesDialog = (
    {
        openDialog, 
        setOpenDialog, 
        phrasesData,
        setPhrasesData,
        selectedPhrasesData,
        setSelectedPhrases
    } : 
    {   
        openDialog: boolean, 
        setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, 
        phrasesData: PhraseData[],
        setPhrasesData: React.Dispatch<React.SetStateAction<PhraseData[]>>, 
        selectedPhrasesData: PhraseData[],
        setSelectedPhrases: React.Dispatch<React.SetStateAction<PhraseData[]>>
    }
)=>{
    useEffect(() => {
        if (openDialog) {
          setStatusMessage("")
          setLoading(false)
        }
      }, [openDialog])
    const [loading, setLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")

    const confirmDelete = async()=>{
        if (!selectedPhrasesData.length) return;
        
        setLoading(true)
        const selectedPhraseIds = selectedPhrasesData.map(item => item["id"])
        const response = await deletePhrases({phrase_ids: selectedPhraseIds})
        if (response.status==="success"){
            setPhrasesData(phrasesData.filter(item => !selectedPhrasesData.includes(item)))
            toast("Success",{
                description: "Vocab Deleted!"
              })
            setOpenDialog(false)
            setSelectedPhrases([])
        }
        else{
            setStatusMessage("Error: " + response.error!)
        }
        setLoading(false)
    }
    return(
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                    ) : "Delete"}
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

