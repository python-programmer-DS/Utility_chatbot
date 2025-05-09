import { useChatbot } from '../../contexts/ChatbotContext';

export default function ChatHeader({ onClose }: { onClose: () => void }) {
  const { botName, logoUrl } = useChatbot();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={logoUrl}
            alt={`${botName} Logo`}
            className="rounded-full w-10 h-10 border-2 border-white"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-lg">{botName}</h3>
          <p className="text-xs opacity-75">Online</p>
        </div>
      </div>
      <button onClick={onClose} className="text-white text-2xl font-bold">&times;</button>
    </div>
  );
}
