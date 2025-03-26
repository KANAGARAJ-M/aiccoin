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
    
    // Track if app was successfully opened
    let appOpenedSuccessfully = false;
    
    if (isAndroid) {
      // First try an iframe to avoid popup blockers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      
      // Then try the intent URL after a short delay
      setTimeout(() => {
        window.location.href = intentUrl;
        
        // Check if app was opened after a short delay
        setTimeout(() => {
          if (document.visibilityState !== 'hidden') {
            // App wasn't opened, show Play Store download option
            showAppDownloadModal();
          } else {
            appOpenedSuccessfully = true;
          }
        }, 1000);
      }, 100);
    } else if (isIOS) {
      // iOS approach
      window.location.href = appUrl;
      
      setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
          // App wasn't opened, redirect to app store
          window.location.href = 'https://apps.apple.com/app/aiccoin/idXXXXXXXXXX';
        } else {
          appOpenedSuccessfully = true;
        }
      }, 1000);
    } else {
      // Desktop or other device, show download options
      showAppDownloadModal();
    }
    
    // Hide the banner if we attempted to open the app
    const banner = document.getElementById('app-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }
  
  // Function to show download modal when app isn't installed
  function showAppDownloadModal() {
    // Create the modal overlay
    const modal = document.createElement('div');
    modal.id = 'app-download-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: #fff;
      border-radius: 12px;
      max-width: 90%;
      width: 360px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    // Modal header
    const header = document.createElement('h3');
    header.textContent = 'App Not Found';
    header.style.cssText = `
      margin-top: 0;
      color: #333;
      font-size: 20px;
      margin-bottom: 16px;
    `;
    
    // Modal message
    const message = document.createElement('p');
    message.textContent = 'It looks like you don\'t have the AIC Coin app installed yet. Download it now for the best experience!';
    message.style.cssText = `
      color: #666;
      margin-bottom: 24px;
      line-height: 1.5;
      font-size: 16px;
    `;
    
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download from Play Store';
    downloadBtn.style.cssText = `
      background: #00ccff;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 12px;
      width: 100%;
    `;
    downloadBtn.addEventListener('click', () => {
      window.location.href = 'https://play.google.com/store/apps/details?id=aiccoin.nocorps.org';
    });
    
    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Continue with Web Version';
    cancelBtn.style.cssText = `
      background: transparent;
      color: #666;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 14px;
      cursor: pointer;
      width: 100%;
    `;
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Append all elements
    modalContent.appendChild(header);
    modalContent.appendChild(message);
    modalContent.appendChild(downloadBtn);
    modalContent.appendChild(cancelBtn);
    modal.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modal);
  }
  
  // Make the function directly accessible from onclick events
  window.tryOpenApp = tryOpenApp;
  window.showAppDownloadModal = showAppDownloadModal;
  
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

// Add a banner to open app if on mobile
if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.createElement('div');
    banner.id = 'app-banner';
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
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    `;
    banner.innerHTML = `
      <span style="flex: 1;">Open in AIC Coin App</span>
      <button id="open-app-btn" style="background: white; color: #00ccff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin: 0 10px;">Open</button>
      <button id="close-banner-btn" style="background: transparent; color: white; border: none; font-size: 18px; padding: 0 10px;">&times;</button>
    `;
    document.body.appendChild(banner);
    
    document.getElementById('open-app-btn').addEventListener('click', tryOpenApp);
    document.getElementById('close-banner-btn').addEventListener('click', () => {
      banner.style.display = 'none';
    });
  });
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

