import { Message } from './types';
import SuggestedActions from './SuggestedActions';
import * as AdaptiveCards from 'adaptivecards';

interface Props {
  messages: Message[];
  onActionClick: (value: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// ✅ Helper to safely render Adaptive Card
function renderAdaptiveCard(el: HTMLDivElement | null, content: any) {
  if (!el || !content) return;

  const card = new AdaptiveCards.AdaptiveCard();
  card.parse(content);
  el.innerHTML = '';
  const renderedCard = card.render();
  if (renderedCard) {
    el.appendChild(renderedCard);
  }
}

export default function ChatMessages({ messages, onActionClick, messagesEndRef }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
          {msg.sender === 'bot' && (idx === 0 || messages[idx - 1]?.sender !== 'bot') && (
            <div className="text-sm text-blue-600 font-bold mb-1">Energos</div>
          )}
          <div
            className={`px-4 py-2 rounded-2xl max-w-[75%] message-bubble ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white border text-gray-800 rounded-bl-none'
            }`}
          >
            <div>
              {msg.text && <div>{msg.text}</div>}

              {/* ✅ Render Adaptive Card if present */}
              {msg.attachment?.contentType === 'application/vnd.microsoft.card.adaptive' && (
                <div ref={(el) => renderAdaptiveCard(el, msg.attachment?.content)} />
              )}
            </div>
          </div>

          {msg.actions?.length ? (
            <SuggestedActions actions={msg.actions} onClick={onActionClick} />
          ) : null}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
