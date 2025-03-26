<template>
  <div class="app-container">
    <!-- Only show NavBar for non-admin routes -->
    <NavBar v-if="!isAdminRoute" />
    <main :class="{ 'content': !isAdminRoute, 'admin-content': isAdminRoute }">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: { NavBar },
  setup() {
    const route = useRoute();
    
    const isAdminRoute = computed(() => {
      return route.path.startsWith('/admin');
    });

    onMounted(async () => {
      // Listen for deep link events from native layer
      window.addEventListener('deepLinkOpen', handleDeepLink);
      
      // Check for initial deep link if any
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
          const { Plugins } = window.Capacitor;
          // This will only work if DeepLinkPlugin is registered
          if (Plugins.DeepLinkPlugin) {
            const result = await Plugins.DeepLinkPlugin.getLastDeepLink();
            if (result.url) {
              handleDeepLink({ detail: { url: result.url } });
            }
          }
          
          // Also try the App plugin
          const { App } = Plugins;
          if (App) {
            App.addListener('appUrlOpen', (data) => {
              handleDeepLink({ detail: { url: data.url } });
            });
            
            // Check if opened with URL
            const urlResult = await App.getLaunchUrl();
            if (urlResult && urlResult.url) {
              handleDeepLink({ detail: { url: urlResult.url } });
            }
          }
        } catch (error) {
          console.error("Error checking deep links:", error);
        }
      }
    });

    onUnmounted(() => {
      // Clean up event listeners
      window.removeEventListener('deepLinkOpen', handleDeepLink);
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        const { App } = window.Capacitor.Plugins;
        if (App) {
          App.removeAllListeners();
        }
      }
    });

    // Function to handle deep links
    const handleDeepLink = (event) => {
      if (event && event.detail && event.detail.url) {
        const url = event.detail.url;
        console.log("Handling deep link:", url);
        
        try {
          // Parse the URL
          const parsedUrl = new URL(url);
          
          // Check if it's a registration link with referral
          if (parsedUrl.pathname.includes('/register')) {
            // Extract the ref parameter
            const refCode = parsedUrl.searchParams.get('ref');
            if (refCode) {
              console.log("Found referral code:", refCode);
              referralCode.value = refCode;
            }
          }
        } catch (error) {
          console.error("Error parsing deep link URL:", error);
        }
      }
    };

    return {
      isAdminRoute
    };
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
}

.content {
  padding-bottom: 100px; /* Add padding for the bottom nav */
}

.admin-content {
  padding: 0;
  min-height: 100vh;
  background: #1a1a1a;
}

@media (max-width: 768px) {
  .content {
    padding-bottom: 120px; /* Increase padding for mobile screens */
  }
  
  .admin-content {
    padding: 0;
  }
}
</style>
