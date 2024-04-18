"use client"

import React, { useEffect, useState }  from 'react'

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { useProcessing } from '@/hooks/useIsProcessing';
import ProcessingButton from '@/components/ProcessingButton';
import { ZenithCommand } from '@/types/ZenithCommand';

type Props = {
  command: ZenithCommand;
}

const Prompt = ({command}: Props) => {
  const [prompt, setPrompt] = useState('');
  const { isProcessing: isLoading, startProcessing: startLoading} = useProcessing(true);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const savingPrompt = async () => { 
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem(command.name, prompt);
    toast.success(`${command.name} saved!`, {position: "top-left"});
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

  return (
    <>
      <Label className="ml-2 text-md">{command.name}</Label>
      <Textarea
        placeholder={isLoading ? "Loading..." : "Type or paste your prompt here..."}
        className={'min-h-[500px]'}
        onChange={handlePromptChange}
        value={prompt}
        disabled={isLoading}
      />
      <ProcessingButton doProcessing={savingPrompt} buttonText="Send To API" disabled={isLoading} />
    </>
  )
}

export default Prompt;
