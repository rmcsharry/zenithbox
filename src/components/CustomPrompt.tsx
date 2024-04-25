import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type Props = {
  customPrompt: string;
  setCustomPrompt: (content: string) => void;
}

const CustomPrompt = ({ customPrompt, setCustomPrompt }: Props) => {
  const [prompt, setPrompt] = useState('');
  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(event.target.value);
  };
  const id = "custom-prompt"

  // const handleSend = async () => {
  //   const customPrompt = () => {
  //     const customPrompt = {
  //       "role": "user",
  //       "content": prompt
  //     }
  //     return customPrompt
  //   }
  //   const fullPrompts = [...prompts, customPrompt()];
  //   console.log('full prompts are:', fullPrompts);
  //   const apiResponse = await sendToApi([...prompts, customPrompt()])
  //   setAiMessage(apiResponse?.choices[0].message.content);
  // };

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
      {/* <Button className="mt-2" onClick={handleSend} disabled={!prompt}>
        Send
      </Button> */}
    </>
  )
}

export default CustomPrompt