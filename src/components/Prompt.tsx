"use client"

import React, { useEffect, useState }  from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {
  label: string;
}

const Prompt = ({label}: Props) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setisProcessing] = useState(true);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSave = async () => {
    setisProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem(label, prompt);
    setisProcessing(false);
    toast.success(`${label} saved!`, {position: "top-right"});
  };

  useEffect(() => {
    const savedPrompt = localStorage.getItem(label);
    if (savedPrompt) {
      setPrompt(savedPrompt);
    };
    setisProcessing(false);
  }, [label]);

  return (
    <>
      <Label htmlFor="message-2">{label}</Label>
      <Textarea
        placeholder={isProcessing ? "Loading..." : "Type or paste your prompt here..."}
        className={'min-h-[500px]'}
        onChange={handlePromptChange}
        value={prompt}
      />
      <Button className="mt-4 w-full" onClick={handleSave} disabled={isProcessing}>
        {isProcessing ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait...</p>
          </>
        ) : (
          <p>Save</p>
        )}
      </Button>
    </>
  )
}

export default Prompt;
