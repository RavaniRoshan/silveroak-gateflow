import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import TestApp from './TestApp.tsx'
import './index.css'

// Debug logging for production troubleshooting
console.log('🚀 Application starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

// Check if root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('❌ Root element not found! Check index.html');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, initializing React app...');

try {
  createRoot(rootElement).render(<App />);
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('❌ Failed to render React app:', error);
  throw error;
}
