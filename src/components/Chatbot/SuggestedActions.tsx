interface Props {
  actions: { title: string; value: string }[];
  onClick: (value: string) => void;
}

export default function SuggestedActions({ actions, onClick }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onClick(action.value)}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-all"
        >
          {action.title}
        </button>
      ))}
    </div>
  );
}
