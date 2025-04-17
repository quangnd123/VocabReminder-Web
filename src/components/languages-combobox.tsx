"use client"

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
import { Badge } from "@/src/components/ui/badge"
import { cn } from "@/src/lib/utils"
import { LanguageData } from "@/src/types/type"

type LanguagesComboboxProps = {
  label: string
  description: string
  languagesData: LanguageData[]
  chosenLanguagesData: LanguageData[]
  setChosenLanguagesData: React.Dispatch<React.SetStateAction<LanguageData[]>>
}

export function LanguagesCombobox({
  label,
  description,
  languagesData,
  chosenLanguagesData,
  setChosenLanguagesData,
}: LanguagesComboboxProps) {
  const addLanguage = (lang: LanguageData) => {
    if (!chosenLanguagesData.find((l) => l.code === lang.code)) {
      setChosenLanguagesData([...chosenLanguagesData, lang])
    }
  }

  const removeLanguage = (lang: LanguageData) => {
    setChosenLanguagesData(
      chosenLanguagesData.filter((l) => l.code !== lang.code)
    )
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      {/* Label and Popover on the same row */}
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !chosenLanguagesData.length && "text-muted-foreground"
              )}
            >
              {chosenLanguagesData.length
                ? chosenLanguagesData[chosenLanguagesData.length - 1].name
                : "Add language"}
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
                      value={languageData.name}
                      key={languageData.code}
                      onSelect={() => addLanguage(languageData)}
                    >
                      {languageData.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          chosenLanguagesData.find(
                            (l) => l.code === languageData.code
                          )
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Badges on the row below */}
      <div className="flex gap-2 flex-wrap">
        {chosenLanguagesData.map((languageData) => (
          <Badge
            key={languageData.code}
            className="cursor-pointer"
            onClick={() => removeLanguage(languageData)}
          >
            {languageData.name} ✕
          </Badge>
        ))}
      </div>

      {/* Description text at the bottom */}
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>

  )
}
