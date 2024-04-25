import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type Props = {
  customPrompt: string;
  setCustomPrompt: (content: string) => void;
}

const CustomPrompt = ({ customPrompt, setCustomPrompt }: Props) => {
   const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(event.target.value);
  };
  const id = "custom-prompt"

  const handleSend = () => { 
    setCustomPrompt('');
  };

  return (
    <>
      <Label htmlFor={id} className="text-lg">Message</Label>
      <Textarea
        id={id}
        placeholder="Type or paste your message here. When sending a directive, it will be added at the end"
        className={'min-h-[220px]'}
        onChange={handlePromptChange}
        value={customPrompt}
      />
      <Button className="mt-2" onClick={handleSend} disabled={!customPrompt}>
        Clear
      </Button>
    </>
  )
}

export default CustomPrompt