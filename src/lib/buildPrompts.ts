import { ZenithCommand, getControlDocs } from '@/types/ZenithCommand';
import { Prompt } from '@/types/Prompt';


const buildPrompt = (command: ZenithCommand, role: string): Prompt => { 
  const prompt = localStorage.getItem(command.name);

  if (!prompt && command.isRequired) {
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
  if (localStorage.getItem(`${getControlDocs()[1].name}_isRequired`) === 'true') {
    const initialUserPrompt = buildPrompt(getControlDocs()[1], "user");
    return [initialSystemPrompt, initialUserPrompt];
  } else {
     return [initialSystemPrompt]; 
  }
};

const getControlPrompts = (): any[] => {
  const controls = getControlDocs().slice(2).filter((cmd) => cmd.isRequired).map((doc) => buildPrompt(doc, "user"));
  return [...controls]; 
 }

const buildPrompts = (directive: ZenithCommand) => {
  console.log("directive is:", directive, "in BuildPrompts"); 
  console.log("building prompts");

  const directivePrompt = buildPrompt(directive, "user");
  const prompts = [...getPrimaryPrompts(), directivePrompt, ...getControlPrompts()]
  console.log("prompts are:", prompts)

  return prompts;
}

export default buildPrompts;