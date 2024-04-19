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

type Props = {
  command: ZenithCommand;
}

const Prompt = ({command}: Props) => {
  const [prompt, setPrompt] = useState('');
  const { isProcessing: isLoading, startProcessing: startLoading } = useProcessing(true);
  const [selectedDirective, setSelectedDirective] = useState<ZenithCommand | null>(null);
  // const {error, setError} = useErrorStore((state: any) => state.error);
  // const { errorMessage, clearError, setError } = useErrorStore();
  const error = useErrorStore((state: any) => state.error);
  const [prompts] = useBuildPrompts(selectedDirective);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const savingPrompt = async () => { 
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem(command.name, prompt);
    toast.success(`${command.name} saved!`, {position: "top-right"});
  };

  const savePrompt = () => { 
    localStorage.setItem(command.name, prompt);
    toast.success(`${command.name} saved!`, {position: "top-right"});
  }

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
    setSelectedDirective(command);
  }

  return (
    <>
      <Label className="text-md">{command.name}</Label>
      <Textarea
        placeholder={isLoading ? "Loading..." : "Type or paste your text here..."}
        className={'min-h-[400px]'}
        onChange={handlePromptChange}
        value={prompt}
        disabled={isLoading}
        onBlur={savePrompt}
      />
      <div className="flex gap-x-4 mt-4">
        <ProcessingButton doProcessing={savingPrompt} buttonText="Save" disabled={isLoading} />
        {command.type === ZenithCommandType.Directives &&
          <ProcessingButton variant="destructive" doProcessing={() => handleSendToApi(command)} buttonText="Send To API" disabled={isLoading} />
        }
      </div>
      {error && <AlertDestructive className="mt-4" />}
    </>
  )
}

export default Prompt;
