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

// Web-to-App deep linking for mobile browsers
if (!window.Capacitor && window.location.hostname === 'aiccoin.netlify.app') {
  // Track app open attempt
  let hasAttemptedAppOpen = false;
  let appOpenTimer = null;
  
  // Function to check if user's device has the app installed
  function tryOpenApp() {
    // Prevent multiple attempts
    if (hasAttemptedAppOpen) return;
    hasAttemptedAppOpen = true;
    
    // Current URL path and parameters
    const currentUrl = new URL(window.location.href);
    const path = currentUrl.pathname || '/';
    const searchParams = new URLSearchParams(currentUrl.search).toString();
    
    // Remove leading slash for the custom scheme
    const pathNoSlash = path.startsWith('/') ? path.substring(1) : path;
    
    // Record time before attempting to open app
    const openTime = Date.now();
    
    // For Android - use Intent URL for maximum compatibility
    if (/Android/i.test(navigator.userAgent)) {
      // Hide the app banner
      const banner = document.getElementById('app-banner');
      if (banner) banner.style.display = 'none';
      
      // Modern implementation for Android using Intent URLs
      const fallbackUrl = encodeURIComponent('https://play.google.com/store/apps/details?id=aiccoin.nocorps.org');
      const intentUrl = `intent://${pathNoSlash}?${searchParams}#Intent;scheme=aiccoin;package=aiccoin.nocorps.org;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${fallbackUrl};end`;
      
      // Try to open the app with a hidden iframe first (helps avoid popup blockers)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `aiccoin://${pathNoSlash}${searchParams ? '?' + searchParams : ''}`;
      document.body.appendChild(iframe);
      
      // After a small delay, try the intent URL
      setTimeout(() => {
        window.location.href = intentUrl;
        
        // Set timer to show download dialog if app doesn't open
        appOpenTimer = setTimeout(() => {
          // If we're still here, app probably isn't installed
          showAppDownloadModal();
        }, 1500);
        
        // Clean up iframe
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 100);
      
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // For iOS devices
      const appUrl = `aiccoin://${pathNoSlash}${searchParams ? '?' + searchParams : ''}`;
      
      // Set timeout to detect if app isn't installed
      appOpenTimer = setTimeout(() => {
        // If we're still in foreground, app isn't installed
        showAppDownloadModal();
      }, 2000);
      
      // Try to open the app
      window.location.href = appUrl;
      
    } else {
      // Desktop or other devices - just show download modal
      showAppDownloadModal();
    }
  }
  
  // Function to show download modal when app isn't installed
  function showAppDownloadModal() {
    // Clear any pending timers
    if (appOpenTimer) {
      clearTimeout(appOpenTimer);
      appOpenTimer = null;
    }
    
    // Create modal if it doesn't exist already
    if (document.getElementById('app-download-modal')) return;
    
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
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: modalIn 0.3s ease-out;
    `;
    
    // Add animation keyframes
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes modalIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(styleTag);
    
    // Modal header
    const header = document.createElement('h3');
    header.textContent = 'AIC Coin App';
    header.style.cssText = `
      margin: 0;
      color: #333;
      font-size: 22px;
    `;
    
    // Modal message
    const message = document.createElement('p');
    message.textContent = 'Get the AIC Coin app for a better experience with faster loading and exclusive features!';
    message.style.cssText = `
      color: #666;
      margin: 0;
      line-height: 1.5;
      font-size: 16px;
    `;
    
    // App icon
    const appIcon = document.createElement('div');
    appIcon.style.cssText = `
      width: 80px;
      height: 80px;
      margin: 0 auto;
      background-color: #00ccff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: white;
      font-weight: bold;
    `;
    appIcon.innerHTML = 'AIC';
    
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download from Play Store';
    downloadBtn.style.cssText = `
      background: #00ccff;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 14px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    `;
    downloadBtn.addEventListener('mouseover', () => {
      downloadBtn.style.background = '#00b8e6';
    });
    downloadBtn.addEventListener('mouseout', () => {
      downloadBtn.style.background = '#00ccff';
    });
    downloadBtn.addEventListener('click', () => {
      // Direct Play Store URL
      window.location.href = 'https://play.google.com/store/apps/details?id=aiccoin.nocorps.org';
      
      // Close the modal after redirecting
      if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    });
    
    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Continue with Web Version';
    cancelBtn.style.cssText = `
      background: transparent;
      color: #666;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 12px;
      font-size: 14px;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    `;
    cancelBtn.addEventListener('mouseover', () => {
      cancelBtn.style.background = '#f5f5f5';
    });
    cancelBtn.addEventListener('mouseout', () => {
      cancelBtn.style.background = 'transparent';
    });
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
      // Reset flag to allow future attempts
      hasAttemptedAppOpen = false;
    });
    
    // Append all elements
    modalContent.appendChild(appIcon);
    modalContent.appendChild(header);
    modalContent.appendChild(message);
    modalContent.appendChild(downloadBtn);
    modalContent.appendChild(cancelBtn);
    modal.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modal);
  }
  
  // Make functions available globally
  window.tryOpenApp = tryOpenApp;
  window.showAppDownloadModal = showAppDownloadModal;
  
  // Add a banner to open app if on mobile - ONLY ONE BANNER
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      // Check if banner already exists (prevent duplicates)
      if (document.getElementById('app-banner')) return;
      
      const banner = document.createElement('div');
      banner.id = 'app-banner';
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to right, #00b8e6, #00ccff);
        color: white;
        padding: 14px;
        text-align: center;
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: sans-serif;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        animation: bannerIn 0.5s ease-out;
      `;
      
      // Add animation
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        @keyframes bannerIn {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleTag);
      
      banner.innerHTML = `
        <div style="display: flex; align-items: center; flex: 1;">
          <div style="width: 36px; height: 36px; background: white; border-radius: 8px; margin-right: 12px; display: flex; align-items: center; justify-content: center; color: #00ccff; font-weight: bold;">AIC</div>
          <span style="flex: 1; font-weight: 500;">Open in AIC Coin App</span>
        </div>
        <button id="open-app-btn" style="background: white; color: #00ccff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin: 0 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">Open</button>
        <button id="close-banner-btn" style="background: transparent; color: white; border: none; font-size: 20px; padding: 0 10px;">&times;</button>
      `;
      document.body.appendChild(banner);
      
      document.getElementById('open-app-btn').addEventListener('click', tryOpenApp);
      document.getElementById('close-banner-btn').addEventListener('click', () => {
        banner.style.display = 'none';
      });
      
      // Auto-hide banner after 7 seconds if no interaction
      setTimeout(() => {
        const banner = document.getElementById('app-banner');
        if (banner && !hasAttemptedAppOpen) {
          banner.style.animation = 'bannerOut 0.5s ease-in forwards';
          const styleTag = document.createElement('style');
          styleTag.textContent = `
            @keyframes bannerOut {
              0% { transform: translateY(0); }
              100% { transform: translateY(100%); }
            }
          `;
          document.head.appendChild(styleTag);
          
          setTimeout(() => {
            if (banner && banner.parentNode) {
              banner.parentNode.removeChild(banner);
            }
          }, 500);
        }
      }, 7000);
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

