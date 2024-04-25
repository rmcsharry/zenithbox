"use client"

import CommandMenu from '@/components/CommandMenu';
import CustomMessage from '@/components/CustomMessage';
import Prompt from '@/components/Prompt';
import { ZenithCommand, getControlDocs } from '@/types/ZenithCommand';
import { useEffect, useState } from 'react';

export default function Home() {
  const [command, setCommand] = useState<ZenithCommand | null>(null);
  const [selectedDirective, setSelectedDirective] = useState<ZenithCommand | null>(null);
  const [aiMessage, setAiMessage] = useState<string>('');

  const handleCommand = (command: ZenithCommand) => {
    setCommand(command);
    console.log('command is:', command)
  };

  useEffect(() => {
    setCommand(getControlDocs()[0]);
   }, []);

  if (!command) { return };

  return (
    <main>
      <div className="grid grid-cols-2 w-full">
        <div>
          <CommandMenu onCommandSelected={handleCommand} selected={command} />
          <div className="mt-4 ml-4">
            <CustomMessage
              selectedDirective={selectedDirective}
              aiMessage={aiMessage}
              setAiMessage={setAiMessage}
            />
          </div>
        </div>
        <div className="mx-2">
          <Prompt
            command={command}
            selectedDirective={selectedDirective}
            setSelectedDirective={setSelectedDirective}
            aiMessage={aiMessage}
            setAiMessage={setAiMessage}
          />
        </div>
      </div>
    </main>
  );
}
