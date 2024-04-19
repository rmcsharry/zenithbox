"use client"

import { AlertDestructive } from '@/components/AlertDestructive';
import CommandMenu from '@/components/CommandMenu';
import Prompt from '@/components/Prompt';
import { ZenithCommand, ZenithCommandType, controlDocs } from '@/types/ZenithCommand';
import { useState } from 'react';

export default function Home() {
  const [command, setCommand] = useState<ZenithCommand>(controlDocs[0]);

  const handleCommand = (command: ZenithCommand) => {
    setCommand(command);
  };

  return (
    <main>
      <div className="grid grid-cols-2 h-[calc(100vh-64px)] w-full">
        <CommandMenu onCommandSelected={handleCommand}/>
        <div className="mx-2">
          <Prompt command={command} />
        </div>
        <div></div>
      </div>
    </main>
  );
}
