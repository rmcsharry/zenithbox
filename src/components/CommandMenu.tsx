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
import { ZenithCommand, directives, getControlDocs } from '@/types/ZenithCommand';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';


type Props = {
  onCommandSelected: (command: ZenithCommand) => void;
  selected: ZenithCommand;
}

const CommandMenu = ({ onCommandSelected, selected }: Props) => {
  const [commands, setCommands] = React.useState<ZenithCommand[]>([]);

  useEffect(() => {
    setCommands(getControlDocs());
    onCommandSelected(selected);
  }, []);

  const handleCommand = (command: ZenithCommand) => () => {
    onCommandSelected(command);
  };

  const handleIsRequired = (command: ZenithCommand, state: CheckedState) => {
    localStorage.setItem(`${command.name}_isRequired`, state.toString());

    const newCommands = commands.map((cmd) => {
      if (cmd.name === command.name) {
        return { ...cmd, isRequired: state as boolean };
      }
      return cmd;
    });

    setCommands(newCommands);
  };

  return (
    <Command className="border h-[calc(100vh-64px)]">
      <CommandList className="max-h-[600px]">
        <CommandGroup heading="Control Docs">
          {commands.map((command, index) => (
            <div key={command.name} className="flex justify-between">
              <CommandItem
                onSelect={handleCommand(command)}
                className={`w-full ${selected.name === command.name ? 'bg-blue-200' : 'transparent'}`}>
                <span>{command.name}</span>
              </CommandItem>
              <Checkbox 
                id={command.name} 
                className="self-center ml-2" 
                checked={command.isRequired} 
                onCheckedChange={(state) => handleIsRequired(command, state )} 
              />
            </div>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Directives">
          {directives.map((directive, index) => (
            <CommandItem
              key={index}
              onSelect={handleCommand(directive)}
              className={selected.name === directive.name ? 'bg-blue-200' : 'transparent'}>
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