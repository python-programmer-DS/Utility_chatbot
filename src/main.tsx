import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatbotProvider } from './contexts/ChatbotContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatbotProvider>
      <App />
    </ChatbotProvider>
  </StrictMode>
);
