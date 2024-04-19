import { ZenithCommand, controlDocs } from '@/types/ZenithCommand';
import useErrorStore from '../../store/useErrorStore';
import { useState, useEffect } from 'react';
import { Prompt } from '@/types/Prompt';


const buildPrompt = (command: ZenithCommand, sender: string): Prompt => { 
  const prompt = localStorage.getItem(command.name);

  if (!prompt) {
    throw new Error(`${command.name} is empty`);
  }

  return {
    message: prompt,
    sender,
    direction: "outgoing",
  };
}

const getControlPrompts = (): any[] => {
  // The system message DEFINES the logic of our chatGPT
  const initialPrompt = buildPrompt(controlDocs[0], "system");
  const controls = controlDocs.slice(1).map((doc) => buildPrompt(doc, "user"));
  return [initialPrompt, controls]; 
};

const useBuildPrompts = (directive: ZenithCommand | null) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const setError = useErrorStore((state: any) => state.setError);

  useEffect(() => {
    const buildPrompts = async () => {
      if (!directive) return;

      try {  
        const controlPrompts = getControlPrompts();
        const directivePrompt = buildPrompt(directive, "user");
        console.log(controlPrompts, directivePrompt, "controlPrompts, directivePrompt")
        setPrompts([...controlPrompts, directivePrompt]);
      } catch (error: any) {
        setError(error.message)
        setPrompts([]);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }

    buildPrompts();
  }, [directive]);

  return prompts;
}

export default useBuildPrompts;