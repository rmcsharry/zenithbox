"use client"

import React, {useEffect} from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboBoxOptions = {
  label: string
  value: string
};

type Props = {
  options: ComboBoxOptions[];
};

const ComboBox = ({options}: Props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelectChanged = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    localStorage.setItem("model", currentValue);
  };

  useEffect(() => {
    setValue(options[0].value)
    localStorage.setItem("model", options[0].value);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border border-gray-300"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select model..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => handleSelectChanged(currentValue)}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox;
