import { useEffect, useRef, useState } from 'react';
import { DirectLine } from 'botframework-directlinejs';
import { createDirectLine } from 'botframework-webchat';
import { Message } from './types';

export function useBotConnection(tokenUrl: string) {
  const [directLine, setDirectLine] = useState<DirectLine | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastSender, setLastSender] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = async () => {
      try {
        const res = await fetch(tokenUrl);
        const { token } = await res.json();
        const dl = createDirectLine({ token });
        setDirectLine(dl);

        dl.activity$.subscribe(activity => {
          if (activity.type === 'message') {
            // 🧠 Handle bot messages
            if (activity.from?.role === 'bot') {
              const safeActions = (activity.suggestedActions?.actions || []).map(action => ({
                title: action.title ?? '',
                value: action.value ?? ''
              }));

              const attachment = activity.attachments?.[0];
              const isAdaptiveCard = attachment?.contentType === 'application/vnd.microsoft.card.adaptive';

              setMessages(prev => [
                ...prev,
                {
                  sender: 'bot',
                  text: activity.text ?? '',
                  actions: safeActions.length > 0 ? safeActions : undefined,
                  attachment: isAdaptiveCard
                    ? {
                        contentType: attachment.contentType,
                        content: (attachment as any).content
                      }
                    : undefined
                }
              ]);

              setLastSender('bot');
            }

            // 🧠 Handle user form submission (e.g., Action.Submit)
            else if (activity.from?.role === 'user' && activity.value) {
              console.log('User submitted form data:', activity.value); // { username, password }

              setMessages(prev => [
                ...prev,
                {
                  sender: 'user',
                  text: 'Submitted credentials'
                }
              ]);

              // 🔐 Optional: Call login API here with activity.value.username / password
            }
          }
        });

        // Start conversation
        dl.postActivity({
          type: 'event',
          name: 'startConversation',
          from: { id: 'user1' },
          value: {
            locale: 'en-US',
            localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }).subscribe();
      } catch (e) {
        console.error('Bot connection failed', e);
      }
    };

    start();
  }, [tokenUrl]);

  return { directLine, messages, setMessages, lastSender };
}
