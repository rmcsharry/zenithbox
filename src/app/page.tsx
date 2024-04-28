"use client"

import CommandMenu from '@/components/CommandMenu';
import CustomPrompt from '@/components/CustomPrompt';
import Prompt from '@/components/Prompt';
import { ZenithCommand, ZenithCommandType, getControlDocs } from '@/types/ZenithCommand';
import { useEffect, useState } from 'react';
import ProcessingButton from '@/components/ProcessingButton';
import useErrorStore from '../../store/useErrorStore';
import { AlertDestructive } from '@/components/AlertDestructive';
import SimpleCard from '@/components/ResponseCard';
import buildPrompts, { buildControlPrompts } from '@/lib/buildPrompts';
import sendToApi from '@/lib/sendToApi';
import { toast } from 'sonner';

export default function Home() {
  const [command, setCommand] = useState<ZenithCommand | null>(null);
  const [selectedDirective, setSelectedDirective] = useState<ZenithCommand | undefined>(undefined);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError, clearError] = useErrorStore((state: any) => [state.error, state.setError, state.clearError]);

  const handleCommand = (command: ZenithCommand) => {
    setCommand(command);
    if (command.type === ZenithCommandType.Directives) {
      setSelectedDirective(command)
    } else {
      setSelectedDirective(undefined);
    };
  };

  useEffect(() => {
    setCommand(getControlDocs()[0]);
  }, []);

  const handleSendToApi = async () => {
    setIsSending(true);
    setAiMessage('');
    let toastMessage = '';
    let promptsToSend: any = [];
    try {
      promptsToSend = buildControlPrompts(selectedDirective);
    } catch (error: any) {
      setError(error.message);
      clearError();
    };

    if (selectedDirective && selectedDirective.type === ZenithCommandType.Directives) {
      toastMessage = `Sending Control Docs with ${selectedDirective.name}`;
    } else {
      toastMessage = `Sending Control Docs`;
    };
    if (customPrompt) {
      promptsToSend.push({ content: customPrompt, role: "user" });
      toastMessage += ` and your message`;
    };
    toast.success(toastMessage, { position: "top-center" });
    console.log("promptsToSend are:", promptsToSend)
    console.log("sending to api")

    const apiResponse = await sendToApi(promptsToSend);
    setAiMessage(apiResponse?.choices[0].message.content);
    setIsSending(false);
  };

  // const handleSendToApi = async () => {
  //   setIsSending(true);
  //   setAiMessage('');
  //   let promptsToSend: any = [];
  //   try {
  //     promptsToSend = selectedDirective ? buildPrompts(selectedDirective) : [];
  //   } catch (error: any) {
  //     setError(error.message);
  //     clearError();
  //   };
  //   if (customPrompt) {
  //     promptsToSend.push({ content: customPrompt, role: "user" });
  //   };
  //   console.log("promptsToSend are:", promptsToSend)
  //   console.log("sending to api")
  //   const apiResponse = await sendToApi(promptsToSend);
  //   setAiMessage(apiResponse?.choices[0].message.content);
  //   setIsSending(false);
  // };

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
            <ProcessingButton variant="destructive" doProcessing={handleSendToApi}>
              Send To API
            </ProcessingButton>
          </div>
          <div className="mt-8">
            {error && <AlertDestructive />}
            <h3 className="text-lg font-semibold tracking-tight">Response</h3>
            <SimpleCard aiMessage={aiMessage} isProcessing={isSending} />
          </div>
        </div>
      </div>
    </main>
  );
}
