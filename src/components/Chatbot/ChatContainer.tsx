import { useRef, useEffect, useState } from 'react';
import { useBotConnection } from './useBotConnection';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatbot } from '../../contexts/ChatbotContext';

export default function ChatContainer({ onClose }: { onClose: () => void }) {
  const { tokenEndpoint } = useChatbot();
  const { directLine, messages, setMessages } = useBotConnection(tokenEndpoint);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    if (!directLine || !text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    directLine.postActivity({ type: 'message', from: { id: 'user1' }, text }).subscribe();
    setInput('');
  };

  return (
    <div className="flex flex-col w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} onActionClick={send} messagesEndRef={messagesEndRef} />
      <ChatInput value={input} onChange={setInput} onSend={() => send(input)} />
    </div>
  );
}
