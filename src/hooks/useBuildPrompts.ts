import { ZenithCommand, getControlDocs } from '@/types/ZenithCommand';
import useErrorStore from '../../store/useErrorStore';
import { useState, useEffect } from 'react';
import { Prompt } from '@/types/Prompt';


const buildPrompt = (command: ZenithCommand, role: string): Prompt => { 
  const prompt = localStorage.getItem(command.name);

  if (!prompt && command.option !== 'ignore') {
    throw new Error(`${command.name} is empty`);
  }

  return {
    content: prompt || "",
    role,
  };
}

const getPrimaryPrompts = (): any[] => {
  // The system message DEFINES the logic of our chatGPT
  const initialSystemPrompt = buildPrompt(getControlDocs()[0], "system");
  const initialUserPrompt = buildPrompt(getControlDocs()[1], "user");
  
  return [initialSystemPrompt, initialUserPrompt]; 
};

const getControlPrompts = (): any[] => {
  const controls = getControlDocs().slice(2).filter((cmd) => cmd.option !== 'ignore').map((doc) => buildPrompt(doc, "user"));
  return [...controls]; 
 }


const useBuildPrompts = (directive: ZenithCommand | null) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const setError = useErrorStore((state: any) => state.setError);
  const clearError = useErrorStore((state: any) => state.clearError);

  console.log("directive is:", directive, "in useBuildPrompts");
  
  useEffect(() => {
    const buildPrompts = async () => {
      if (!directive) {
        setPrompts([]);
        return;
      };

      try {
        console.log("building prompts")
        const directivePrompt = buildPrompt(directive, "user");
        const prompts = [...getPrimaryPrompts(), directivePrompt, ...getControlPrompts()]
        console.log("prompts are:", prompts)
        setPrompts(prompts);
      } catch (error: any) {
          setError(error.message)
          setPrompts([]);
          setTimeout(() => {
            clearError();
          }, 3000);
      }
    }

    buildPrompts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  return prompts;
}

export default useBuildPrompts;