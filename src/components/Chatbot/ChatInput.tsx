interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="flex items-center p-3 border-t bg-white gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
        placeholder="Type your message..."
      />
      <button
        onClick={onSend}
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        title="Send"
      >
        {/* Paper Plane Icon (Telegram Style) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}
