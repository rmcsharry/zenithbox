"use client"

import React, { useEffect, useState }  from 'react'

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { useProcessing } from '@/hooks/useIsProcessing';
import ProcessingButton from '@/components/ProcessingButton';
import { ZenithCommand, ZenithCommandType } from '@/types/ZenithCommand';
import sendToApi from '@/lib/sendToApi';
import useErrorStore from '../../store/useErrorStore';
import useBuildPrompts from '@/hooks/useBuildPrompts';
import { AlertDestructive } from '@/components/AlertDestructive';
import SimpleCard from '@/components/ResponseCard';

type Props = {
  command: ZenithCommand;
}

const Prompt = ({command}: Props) => {
  const [prompt, setPrompt] = useState('');
  const { isProcessing: isLoading, startProcessing: startLoading } = useProcessing(true);
  const [selectedDirective, setSelectedDirective] = useState<ZenithCommand | null>(null);
  const [aiMessage, setAiMessage] = useState<string>('');
  const error = useErrorStore((state: any) => state.error);
  const prompts = useBuildPrompts(selectedDirective);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSave = async () => { 
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSelectedDirective(null); // this will trigger the useEffect in useBuildPrompts to clear old prompts
    localStorage.setItem(command.name, prompt);
    toast.success(`${command.name} saved!`, {position: "top-right"});
  };

  useEffect(() => {
    startLoading(async () => {
      const savedPrompt = localStorage.getItem(command.name);
      if (savedPrompt) {
        setPrompt(savedPrompt);
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command]);

  const handleSendToApi = async (command: ZenithCommand) => { 
    setAiMessage('');
    setSelectedDirective(command);
    await new Promise(resolve => setTimeout(resolve, 2500));
  }

  useEffect(() => {
    const sendPromptsToApi = async () => {
      console.log("prompts are:", prompts)
      console.log("sending to api")
      if (prompts.length > 2) {
        const apiResponse = await sendToApi(prompts);
        setAiMessage(apiResponse?.choices[0].message.content);
        setSelectedDirective(null);
      };
    }
  
    if (selectedDirective) {
      sendPromptsToApi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompts]);

  return (
    <>
      <Label className="text-lg">{command.name}</Label>
      <Textarea
        placeholder={isLoading ? "Loading..." : "Type or paste your text here..."}
        className={'min-h-[400px]'}
        onChange={handlePromptChange}
        value={prompt}
        disabled={isLoading}
      />
      <div className="flex gap-x-4 mt-4">
        <ProcessingButton doProcessing={handleSave} disabled={isLoading}>
          Save
        </ProcessingButton>
        {command.type === ZenithCommandType.Directives &&
          <>
            <ProcessingButton variant="destructive" doProcessing={() => handleSendToApi(command)} disabled={error}>
              Send To API
            </ProcessingButton>
          </>
        }
      </div>
      {command.type === ZenithCommandType.Directives &&
        <div className="mt-8">
          {error && <AlertDestructive />}
          {prompts.length > 2 &&
            <>
              <h3 className="text-lg font-semibold tracking-tight">Response</h3>
              <SimpleCard aiMessage={aiMessage} />
            </>
          }
        </div>
      }
    </>
  )
}

export default Prompt;
