export interface Message {
  sender: 'user' | 'bot';
  text?: string;
  actions?: { title: string; value: string }[];
  attachment?: {
    contentType: string;
    content: any;
  };
}
