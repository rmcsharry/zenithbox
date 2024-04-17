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
  const [messages, setMessages] = useState<MessageModel[]>([
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
    const newMessage: MessageModel = {
      message,
      sender: "user",
      direction: "outgoing",
      position: "single",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    // await processMessageToChatGPT(newMessages);
  };

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
    </div>
    </div>
  );
}

export default ChatPage