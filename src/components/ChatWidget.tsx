import { useEffect, useState, useRef } from 'react';
import { createDirectLine } from 'botframework-webchat';
import { DirectLine } from 'botframework-directlinejs';

// Message interface
interface Message {
  sender: 'user' | 'bot';
  text: string;
  actions?: { title: string; value: string }[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [directLine, setDirectLine] = useState<DirectLine | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [lastSender, setLastSender] = useState<'user' | 'bot' | null>(null);

  useEffect(() => {
    if (isOpen && !directLine) {
      startChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const startChat = async () => {
    try {
      const res = await fetch('https://defaulta5bb70244afb4922bb2ab8bec4f12b.b9.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr59c_ancenergyUtilityBot/directline/token?api-version=2022-03-01-preview');
      const { token } = await res.json();
      const newDirectLine = createDirectLine({ token });
      setDirectLine(newDirectLine);

      newDirectLine.activity$.subscribe(activity => {
        if (activity.type === 'message' && activity.from.role === 'bot') {
          const safeActions = (activity.suggestedActions?.actions || []).map(action => ({
            title: action.title ?? '',
            value: action.value ?? ''
          }));

          setMessages(prev => [...prev, { sender: 'bot', text: activity.text || '', actions: safeActions }]);
          setLastSender('bot');
        }
      });

      newDirectLine.postActivity({
        type: 'event',
        name: 'startConversation',
        from: { id: 'user1' },
        value: {
          locale: 'en-US',
          localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }).subscribe();
    } catch (err) {
      console.error('Error connecting to bot:', err);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !directLine) return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setLastSender('user');

    directLine.postActivity({
      type: 'message',
      from: { id: 'user1' },
      text: input
    }).subscribe();

    setInput('');
  };

  const handleSuggestedAction = (value: string) => {
    if (!directLine) return;

    // Directly send without filling input
    setMessages(prev => [...prev, { sender: 'user', text: value }]);
    setLastSender('user');

    directLine.postActivity({
      type: 'message',
      from: { id: 'user1' },
      text: value
    }).subscribe();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-5 8h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
          </svg>
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="flex flex-col w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          
          {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Energos Bot"
                    className="rounded-full w-10 h-10 border-2 border-white"
                  />
                  {/* Online Green Dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Energos</h3>
                  <p className="text-xs opacity-75">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white text-2xl font-bold">×</button>
            </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Display Energos name only once after user messages */}
                {msg.sender === 'bot' && (idx === 0 || messages[idx-1]?.sender !== 'bot') && (
                  <div className="text-sm text-blue-600 font-bold mb-1">Energos</div>
                )}

                <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none'}`}>
                  <div>{msg.text}</div>
                </div>

                {/* Suggested actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedAction(action.value)}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs hover:bg-blue-200 transition-all"
                      >
                        {action.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="flex items-center p-3 border-t bg-white gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-full hover:scale-110 transition-transform"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
