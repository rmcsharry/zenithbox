import { ZenithCommand, controlDocs } from '@/types/ZenithCommand';

const buildPrompt = (command: ZenithCommand, sender: string) => { 
  const prompt = localStorage.getItem(command.name);

  if (!prompt) {
    throw new Error(`Prompt ${command.name} not found in local storage`);
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

const sendToApi = async (directive: ZenithCommand) => {
  const controlPrompts = getControlPrompts();
  const directivePrompt = buildPrompt(directive, "user");

  console.log(controlPrompts, directivePrompt, "controlPrompts, directivePrompt")
}

export default sendToApi;