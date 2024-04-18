"use client"

import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";

const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      message: "Hello, I'm a chat AI!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "single",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: any = {
      message,
      sender: "user",
      direction: "outgoing",
      position: "single",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };


  async function processMessageToChatGPT(chatMessages: any[]) {
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
  
    let apiMessages = chatMessages.map((messageObject: any) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });
  
    const initialPrompt = {
      content: localStorage.getItem("Initial Prompt"),
      role: "system",
    };

    if (!initialPrompt.content) {
      throw new Error("Initial prompt not found in local storage");
    };
  
    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        initialPrompt,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    };
  
    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...apiMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-64px)] w-50">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="The AI is thinking..." /> : null}
          >
            {messages.map((message, i) => {
              console.log(message)
              return <Message key={i} model={message} />
            })}
          </MessageList>
          {/* style={{ position:'fixed', bottom: 0, width: '50%'}} */}
          <MessageInput  placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
      <div>
        <h3 className="my-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Finalized Data Document.
        </h3>
      </div>
    </div>
  );
}

export default ChatPage