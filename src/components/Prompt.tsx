"use client"

import React, { useEffect, useState }  from 'react'

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { useProcessing } from '@/hooks/useIsProcessing';
import ProcessingButton from '@/components/ProcessingButton';
import { ZenithCommand, ZenithCommandType } from '@/types/ZenithCommand';
import useErrorStore from '../../store/useErrorStore';

type Props = {
  command: ZenithCommand;
  setSelectedDirective: (command: ZenithCommand | null) => void;
}

const Prompt = ({command, setSelectedDirective}: Props) => {
  const [prompt, setPrompt] = useState('');
  const { isProcessing: isLoading, startProcessing: startLoading } = useProcessing(true);
  const error = useErrorStore((state: any) => state.error);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    startLoading(async () => {
      const savedPrompt = localStorage.getItem(command.name);
      setPrompt(savedPrompt || '');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command.name]);

  const handleSave = async () => { 
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem(command.name, prompt);
    toast.success(`${command.name} saved!`, {position: "top-right"});
  };

  const id = `promptinput-${command.name}`;

  return (
    <>
      <Label htmlFor={id} className="text-lg">{command.name}</Label>
      <Textarea
        id={id}
        placeholder={isLoading ? "Loading..." : "Type or paste your text here..."}
        className={'min-h-[320px]'}
        onChange={handlePromptChange}
        value={prompt}
        disabled={isLoading}
      />
      <span className="inline-flex mt-4 mr-4">
        <ProcessingButton doProcessing={handleSave} disabled={isLoading}>
          Save
        </ProcessingButton>
      </span>
    </>
  )
}

export default Prompt;
