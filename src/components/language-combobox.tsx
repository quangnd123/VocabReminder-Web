import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"

import { LanguageData } from "@/src/types/type"
import { useState} from "react"

type LanguageComboboxProps = {
    label: string
    description: string
    languagesData: LanguageData[]
    chosenLanguageData: LanguageData | null
    setChosenLanguageData: React.Dispatch<React.SetStateAction<LanguageData | null>>
  }

export function LanguageCombobox({    
    label,
    description,
    languagesData,
    chosenLanguageData,
    setChosenLanguageData
}: LanguageComboboxProps){
    const [open, setOpen] = useState(false)
    return (
      <div className="w-full max-w-sm space-y-2">
      {/* Label and Popover on the same row */}
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
    
        <Popover modal={true} open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !chosenLanguageData && "text-muted-foreground"
              )}
            >
              {chosenLanguageData
                ? chosenLanguageData["name"]
                : "Select language"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
    
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languagesData.map((languageData) => (
                    <CommandItem
                      value={languageData["name"]}
                      key={languageData["code"]}
                      onSelect={() => {
                        setChosenLanguageData(languageData);
                        setOpen(false);
                      }}
                    >
                      {languageData["name"]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    
      {/* Description below */}
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    
    )
}