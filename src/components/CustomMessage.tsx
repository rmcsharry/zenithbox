import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useBuildPrompts from '@/hooks/useBuildPrompts'
import sendToApi from '@/lib/sendToApi'
import { ZenithCommand } from '@/types/ZenithCommand'
import React, { useState } from 'react'

type Props = {
  selectedDirective: ZenithCommand | null;
  aiMessage: string;
  setAiMessage: (message: string) => void;
}

const CustomPrompt = ({selectedDirective, aiMessage, setAiMessage}: Props) => {
  const [prompt, setPrompt] = useState('');
  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
    console.log(prompts)
  };
  const prompts = useBuildPrompts(selectedDirective);
  const id = "custom-prompt"

  const handleSend = async () => {
    const customPrompt = () => {
      const customPrompt = {
        "role": "user",
        "content": prompt
      }
      return customPrompt
    }
    const fullPrompts = [...prompts, customPrompt()];
    console.log('full prompts are:', fullPrompts);
    const apiResponse = await sendToApi([...prompts, customPrompt()])
    setAiMessage(apiResponse?.choices[0].message.content);
  };

  return (
    <>
      <Label htmlFor={id} className="text-lg">Message</Label>
      <Textarea
        id={id}
        placeholder="Type or paste your message here, and hit send"
        className={'min-h-[220px]'}
        onChange={handlePromptChange}
        value={prompt}
      />
      <Button className="mt-2" onClick={handleSend} disabled={!prompt}>
        Send
      </Button>
    </>
  )
}

export default CustomPrompt