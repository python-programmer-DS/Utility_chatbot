import { createContext, useContext, ReactNode } from 'react';
import { chatbotConfig, ChatbotInstanceConfig } from '../config/chatbotConfig';

const ChatbotContext = createContext<ChatbotInstanceConfig>(chatbotConfig);
export const useChatbot = () => useContext(ChatbotContext);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  return (
    <ChatbotContext.Provider value={chatbotConfig}>
      {children}
    </ChatbotContext.Provider>
  );
}
