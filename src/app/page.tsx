"use client"

import CommandMenu from '@/components/CommandMenu';
import CustomPrompt from '@/components/CustomPrompt';
import Prompt from '@/components/Prompt';
import useBuildPrompts from '@/hooks/useBuildPrompts';
import sendToApi from '@/lib/sendToApi';
import { ZenithCommand, ZenithCommandType, getControlDocs } from '@/types/ZenithCommand';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { useProcessing } from '@/hooks/useIsProcessing';
import ProcessingButton from '@/components/ProcessingButton';
import useErrorStore from '../../store/useErrorStore';
import { AlertDestructive } from '@/components/AlertDestructive';
import SimpleCard from '@/components/ResponseCard';
import buildPrompts from '@/lib/buildPrompts';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function Home() {
  const [command, setCommand] = useState<ZenithCommand | null>(null);
  const [selectedDirective, setSelectedDirective] = useState<ZenithCommand | null>(null);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleCommand = (command: ZenithCommand) => {
    setCommand(command);
    if (command.type === ZenithCommandType.Directives) {
      setSelectedDirective(command)
    };
    console.log('command is:', command)
  };

  useEffect(() => {
    setCommand(getControlDocs()[0]);
  }, []);


  const handleSendToApi = async () => {
    setIsSending(true);
    setAiMessage('');
    let promptsToSend: any = selectedDirective ? buildPrompts(selectedDirective) : [];
    if (customPrompt) {
      promptsToSend.push({ content: customPrompt, role: "user" });
    };
    console.log("promptsToSend are:", promptsToSend)
    console.log("sending to api")
    const apiResponse = await sendToApi(promptsToSend);
    setAiMessage(apiResponse?.choices[0].message.content);
    setIsSending(false);
  };

  if (!command) { return };

  return (
    <main>
      <div className="grid grid-cols-2 w-full">
        <div>
          <CommandMenu onCommandSelected={handleCommand} selected={command} />
          <div className="mt-4 ml-4">
            <CustomPrompt
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
            />
          </div>
        </div>
        <div className="mx-2">
          <Prompt
            command={command}
            setSelectedDirective={setSelectedDirective}
          />
          <div className="inline-flex mt-4">
            {command.type === ZenithCommandType.Directives &&
              <>
                <ProcessingButton variant="destructive" doProcessing={handleSendToApi} >
                  Send To API
                </ProcessingButton>
              </>
            }
          </div>
          <div className="mt-8">
            {/* {error && <AlertDestructive />} */}
            {selectedDirective &&
              <>
                <h3 className="text-lg font-semibold tracking-tight">Response</h3>
                <SimpleCard aiMessage={aiMessage} isProcessing={isSending} />
              </>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
