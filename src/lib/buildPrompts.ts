import { ZenithCommand, getControlDocs } from '@/types/ZenithCommand';
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
  if (localStorage.getItem(`${getControlDocs()[1].name}_isRequired`) === 'true') {
    const initialUserPrompt = buildPrompt(getControlDocs()[1], "user");
    return [initialSystemPrompt, initialUserPrompt];
  } else {
     return [initialSystemPrompt]; 
  }
};

const getControlPrompts = (): any[] => {
  const controls = getControlDocs().slice(2).filter((cmd) => cmd.option !== 'ignore').map((doc) => buildPrompt(doc, "user"));
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


export const buildControlPrompts = (directive?: ZenithCommand) => {
  let prompts: any[] = [];
  const controlDocs = getControlDocs();
  const initialSystemPrompt = buildPrompt(controlDocs[0], "system");
  const paPrompt = buildPrompt(controlDocs[1], "system");

  switch (localStorage.getItem(`${controlDocs[1].name}_option`)) {
    case 'ignore':
      prompts.push(initialSystemPrompt);
      if (directive) {
        prompts.push(buildPrompt(directive, "system"));
      };
      break;
    case 'separate':
      prompts.push(initialSystemPrompt);
      prompts.push(paPrompt);
      if (directive) {
        prompts.push(buildPrompt(directive, "system"));
      };
      break;
    case 'append':
      initialSystemPrompt.content += paPrompt.content;
      if (directive) {
        initialSystemPrompt.content += buildPrompt(directive, "system").content;
      };
      prompts.push(initialSystemPrompt);
      break;
  }

  controlDocs.slice(2).map((doc) => {
    switch (localStorage.getItem(`${doc.name}_option`)) {
      case 'ignore':
        break;
      case 'separate':
        prompts.push(buildPrompt(doc, "system"));
        break;
      case 'append':
        prompts[0].content += buildPrompt(doc, "user").content;
        break;
    };
  });

  // const controlPrompts = controls.filter((control) => control !== null && control !== undefined);
  // const fullControlPrompts = [initialSystemPrompt, ...controlPrompts];
  console.log("full controls are:", prompts);
  return prompts;

}