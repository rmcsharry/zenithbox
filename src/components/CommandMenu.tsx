import React, { useEffect } from 'react'
import {
  GearIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ZenithCommand, controlDocs, directives } from '@/types/ZenithCommand';


type Props = {
  onCommandSelected: (command: ZenithCommand) => void;
}

const CommandMenu = ({ onCommandSelected }: Props) => {
  const [selected, setSelected] = React.useState<ZenithCommand>(controlDocs[0]);

  useEffect(() => {
    onCommandSelected(selected);
  }, []);

  const handleCommand = (command: ZenithCommand) => () => {
    setSelected(command);
    onCommandSelected(command);
  }

  return (
    <Command className="border h-[calc(100vh-64px)]">
      <CommandList className="max-h-[600px]">
        <CommandGroup heading="Control Docs">
          {controlDocs.map((doc, index) => (
            <CommandItem key={index} onSelect={handleCommand(doc)}>
              <span>{doc.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Directives">
          {directives.map((directive, index) => (
            <CommandItem key={index} onSelect={handleCommand(directive)}>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>{directive.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default CommandMenu