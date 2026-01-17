import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'; //import pwa register

// allow service worker for pwa
const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        // Optional: Show a "New version available" toast
        // If you want it to be truly automatic:
        updateSW(true);
    },
    onOfflineReady() {
        console.log('Space Atlas is ready for offline star-gazing!');
    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
