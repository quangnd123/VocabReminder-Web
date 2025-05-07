"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"

type GenericMultiComboboxProps<T> = {
  label: string
  description: string
  options: T[]
  selected: T[]
  setSelected: React.Dispatch<React.SetStateAction<T[]>>
  getLabel: (item: T) => string
  getKey: (item: T) => string | number
}

export function GenericMultiCombobox<T>({
  label,
  description,
  options,
  selected,
  setSelected,
  getLabel,
  getKey,
}: GenericMultiComboboxProps<T>) {
  const [open, setOpen] = useState(false)

  const addItem = (item: T) => {
    const exists = selected.find((s) => getKey(s) === getKey(item))
    if (!exists) {
      setSelected([...selected, item])
    }
  }

  const removeItem = (item: T) => {
    setSelected(selected.filter((s) => getKey(s) !== getKey(item)))
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Popover modal open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "justify-between",
                !selected.length && "text-muted-foreground"
              )}
            >
              {selected.length
                ? getLabel(selected[selected.length - 1])
                : `Add ${label.toLowerCase()}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  {options.map((item) => {
                    const isSelected = selected.some(
                      (s) => getKey(s) === getKey(item)
                    )
                    return (
                      <CommandItem
                        key={getKey(item)}
                        value={getLabel(item)}
                        onSelect={() => addItem(item)}
                      >
                        {getLabel(item)}
                        <Check
                          className={cn(
                            "ml-auto",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 flex-wrap">
        {selected.map((item) => (
          <Badge
            key={getKey(item)}
            className="cursor-pointer"
            onClick={() => removeItem(item)}
          >
            {getLabel(item)} ✕
          </Badge>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
