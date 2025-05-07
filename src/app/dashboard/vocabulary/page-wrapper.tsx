"use client"
import { useState } from "react"
import { DataTable } from "../../../components/table";
import { AddPhraseDialog } from "./add-phrase-dialog";
import { PhraseData } from "@/types/type";
import { DeletePhrasesDialog } from "./delete-phrases-dialog";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"


export default function PageWrapper({ initialData  }: { initialData : PhraseData[] }) {
    const columns: ColumnDef<PhraseData>[] = [
        {
          header: "#",
          cell: (info) => info.row.index + 1
        },
        {
          accessorKey: "phrase",
          header: "Phrase",
        },
        {
          accessorKey: "sentence",
          header: "Sentence",
        },
        {
          accessorKey: "language",
          header: "Language",
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const phraseData: PhraseData = row.original
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleColumnDeleteClick(phraseData)}
                  >
                    Delete
                  </DropdownMenuItem>
                  {/* <DropdownMenuSeparator /> */}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
    ]

    const [phrasesData, setPhrasesData] = useState(initialData)
    const [selectedPhrases, setSelectedPhrases] = useState<PhraseData[]>([])
    const [openDeletePhrasesDialog, setOpenDeletePhrasesDialog] = useState(false)

    const handleColumnDeleteClick = (row: PhraseData)=>{
        setSelectedPhrases([row])
        setOpenDeletePhrasesDialog(true)
    }

    return (
        <div className="container mx-auto py-10 mx-auto px-4">
            <AddPhraseDialog 
                phrasesData={phrasesData}
                setPhrasesData={setPhrasesData}
                />
            <DataTable columns={columns} data={phrasesData} />
            <DeletePhrasesDialog 
                openDialog={openDeletePhrasesDialog}
                setOpenDialog={setOpenDeletePhrasesDialog}
                phrasesData={phrasesData}
                setPhrasesData={setPhrasesData}
                selectedPhrasesData={selectedPhrases}
                setSelectedPhrases={setSelectedPhrases}
                />
        </div>
    );
}