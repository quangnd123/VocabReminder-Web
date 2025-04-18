import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

type GenericComboboxProps<T> = {
  label: string;
  description: string;
  options: T[];
  selected: T | null;
  setSelected: React.Dispatch<React.SetStateAction<T | null>>;
  getLabel: (item: T) => string;
  getKey: (item: T) => string | number;
};

export function GenericCombobox<T>({
  label,
  description,
  options,
  selected,
  setSelected,
  getLabel,
  getKey,
}: GenericComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>

        <Popover modal={true} open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "justify-between",
                !selected && "text-muted-foreground"
              )}
            >
              {selected ? getLabel(selected) : `Select ${label.toLowerCase()}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  {options.map((item) => (
                    <CommandItem
                      key={getKey(item)}
                      value={getLabel(item)}
                      onSelect={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                    >
                      {getLabel(item)}
                      {selected && getKey(selected) === getKey(item) && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
