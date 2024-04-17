import { MessageModel } from '@chatscope/chat-ui-kit-react';

const initialPrompt = { 
  "role": "system", "content": ""
}

export async function processMessageToChatGPT(chatMessages: MessageModel[]) {
  // Format messages for chatGPT API
  // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
  // So we need to reformat

  let apiMessages = chatMessages.map((messageObject: MessageModel) => {
    let role = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message }
  });


  // Get the request body set up with the model we plan to use
  // and the messages which we formatted above. We add a system message in the front to'
  // determine how we want chatGPT to act. 
  const apiRequestBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
      initialPrompt,  // The system message DEFINES the logic of our chatGPT
      ...apiMessages // The messages from our chat with ChatGPT
    ]
  }
}