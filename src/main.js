// Add this code at the top before imports
if (window.location.hostname === 'aiccoin.nocorps.org' || window.location.hostname === 'aiccoin.site') {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  const ref = searchParams.get('ref'); // Get referral code if exists
  const path = currentUrl.pathname; // Get the path
  
  // Construct base URL with path
  let redirectUrl = `https://aiccoin.netlify.app${path}`;
  
  // Add referral code if present
  if (ref) {
    redirectUrl += `?ref=${ref}`;
  }

  // Add any other query parameters (except ref which we already handled)
  searchParams.forEach((value, key) => {
    if (key !== 'ref') {
      redirectUrl += redirectUrl.includes('?') ? '&' : '?';
      redirectUrl += `${key}=${value}`;
    }
  });

  window.location.href = redirectUrl;
}

// Check if we're running in a browser and attempt to redirect to the app
if (!window.Capacitor && window.location.hostname === 'aiccoin.netlify.app') {
  // Function to check if user's device has the app installed
  function tryOpenApp() {
    // Current URL path and parameters
    const currentUrl = new URL(window.location.href);
    const path = currentUrl.pathname || '/';
    const searchParams = new URLSearchParams(currentUrl.search).toString();
    
    // Remove leading slash for the custom scheme
    const pathNoSlash = path.startsWith('/') ? path.substring(1) : path;
    
    // Create custom scheme URL: aiccoin://[path]?[query]
    let appUrl = `aiccoin://${pathNoSlash}`;
    if (searchParams) {
      appUrl += `?${searchParams}`;
    }
    
    // Create Intent URL for Android with more reliable format
    const fallbackUrl = encodeURIComponent(window.location.href);
    // Use component form of intent URL for better compatibility
    const intentUrl = `intent://${pathNoSlash}?${searchParams}#Intent;scheme=aiccoin;package=aiccoin.nocorps.org;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${fallbackUrl};end`;
    
    // Try several approaches based on device/browser
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // First try an iframe to avoid popup blockers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      
      // Then try the intent URL after a short delay
      setTimeout(() => {
        window.location.href = intentUrl;
        
        // As last resort, try universal links
        setTimeout(() => {
          window.location.href = `https://aiccoin.netlify.app${path}${searchParams ? '?' + searchParams : ''}`;
        }, 500);
      }, 100);
    } else if (isIOS) {
      // iOS approach
      window.location.href = appUrl;
      
      setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
          // App wasn't opened, redirect to app store
          window.location.href = 'https://apps.apple.com/app/aiccoin/idXXXXXXXXXX';
        }
      }, 500);
    } else {
      // Desktop or other device, just try the custom scheme
      window.location.href = appUrl;
    }
  }
  
  // Make the function directly accessible from onclick events
  window.tryOpenApp = tryOpenApp;
  
  // Add a banner to open app if on mobile
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      const banner = document.createElement('div');
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #00ccff;
        color: white;
        padding: 12px;
        text-align: center;
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: sans-serif;
      `;
      banner.innerHTML = `
        <span>Open in AIC Coin App</span>
        <button id="open-app-btn" style="background: white; color: #00ccff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold;">Open</button>
        <button id="close-banner-btn" style="background: transparent; color: white; border: none; font-size: 18px; margin-left: 10px;">&times;</button>
      `;
      document.body.appendChild(banner);
      
      document.getElementById('open-app-btn').addEventListener('click', tryOpenApp);
      document.getElementById('close-banner-btn').addEventListener('click', () => {
        banner.style.display = 'none';
      });
    });
  }
}

//npx cap init "AIC Coin" "aiccoin.nocorps.org" --web-dir=dist

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/disble.css';

createApp(App)
  .use(router)
  .mount('#app');

// Disable right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, and other DevTools shortcuts
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' || // F12 key
    (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl + Shift + I
    (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl + Shift + J
    (e.ctrlKey && e.key === 'U') // Ctrl + U (View Source)
  ) {
    e.preventDefault();
    // alert('Inspect element is disabled.');
  }
});

// Prevent drag and drop (optional)
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Optional: Block user from opening developer tools via DevTools APIs
setInterval(() => {
  const devToolsOpened = /./;
  devToolsOpened.toString = function () {
    // alert('Inspect element is disabled.');
  };
}, 1000);

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.getElementsByTagName('head')[0].appendChild(meta);

// Block pinch-zoom gestures
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});
document.addEventListener('gesturechange', (e) => {
  e.preventDefault();
});
document.addEventListener('gestureend', (e) => {
  e.preventDefault();
});

// Prevent text selection
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

