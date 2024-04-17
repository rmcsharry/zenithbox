"use client"

import React, { useEffect, useState }  from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  label: string;
}

const Prompt = ({label}: Props) => {
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem(label, prompt);
  };

  useEffect(() => {
    const savedPrompt = localStorage.getItem(label);
    if (savedPrompt) {
      setPrompt(savedPrompt);
    };
  }, [label]);

  return (
    <>
      <Label htmlFor="message-2">{label}</Label>
      <Textarea
        placeholder='Type or paste your initial prompt here...'
        className={'min-h-[500px]'}
        onChange={handlePromptChange}
        value={prompt} />
      <Button className="mt-4 w-full" onClick={handleSave}>Save</Button>
    </>
  )
}

export default Prompt;
