"use client"

import React, { useEffect, useState }  from 'react'

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { useProcessing } from '@/hooks/useIsProcessing';
import ProcessingButton from '@/components/ProcessingButton';

type Props = {
  label: string;
}

const Prompt = ({label}: Props) => {
  const [prompt, setPrompt] = useState('');
  const { isProcessing: isLoading, startProcessing: startLoading} = useProcessing(true);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const savingPrompt = async () => { 
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem(label, prompt);
    toast.success(`${label} saved!`, {position: "top-right"});
  };

  useEffect(() => {
    startLoading(async () => {
      const savedPrompt = localStorage.getItem(label);
      if (savedPrompt) {
        setPrompt(savedPrompt);
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <>
      <Label htmlFor="message-2">{label}</Label>
      <Textarea
        placeholder={isLoading ? "Loading..." : "Type or paste your prompt here..."}
        className={'min-h-[500px]'}
        onChange={handlePromptChange}
        value={prompt}
        disabled={isLoading}
      />
      <ProcessingButton doProcessing={savingPrompt} buttonText="Save" disabled={isLoading} />
    </>
  )
}

export default Prompt;
