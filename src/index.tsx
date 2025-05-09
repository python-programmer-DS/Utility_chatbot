import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatbotProvider } from './contexts/ChatbotContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ChatbotProvider>
    <App />
  </ChatbotProvider>
);
