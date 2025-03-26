package aiccoin.nocorps.org;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";
    private String pendingDeepLink = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Handle the intent that started this activity
        Intent intent = getIntent();
        if (intent != null) {
            handleIntent(intent);
        }
        
        // Register a plugin to handle deep links in JavaScript
        registerPlugin(DeepLinkHandler.class);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent); // Update the stored Intent
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        String action = intent.getAction();
        Uri data = intent.getData();
        
        if (Intent.ACTION_VIEW.equals(action) && data != null) {
            String scheme = data.getScheme();
            String host = data.getHost();
            String path = data.getPath();
            String query = data.getQuery();
            
            // Construct URL to load in WebView
            String urlToLoad = null;
            
            // Handle custom scheme (aiccoin://)
            if ("aiccoin".equals(scheme)) {
                urlToLoad = "https://aiccoin.netlify.app";
                
                // Add path if available
                if (host != null && !host.isEmpty()) {
                    urlToLoad += "/" + host;
                    
                    // Add remaining path if any
                    if (path != null && !path.isEmpty()) {
                        urlToLoad += path;
                    }
                }
                
                // Add query parameters
                if (query != null && !query.isEmpty()) {
                    urlToLoad += "?" + query;
                }
            } else {
                // Handle https scheme - just use the data URL
                urlToLoad = data.toString();
            }
            
            // Load the URL in WebView
            if (urlToLoad != null) {
                bridge.getWebView().loadUrl(urlToLoad);
            }
        }
    }
    
    // Custom plugin to expose deeplink functionality to JavaScript
    public static class DeepLinkHandler extends com.getcapacitor.Plugin {
        @com.getcapacitor.PluginMethod
        public void getPendingDeepLink(com.getcapacitor.PluginCall call) {
            MainActivity activity = (MainActivity) getActivity();
            if (activity != null && activity.pendingDeepLink != null) {
                com.getcapacitor.JSObject ret = new com.getcapacitor.JSObject();
                ret.put("url", activity.pendingDeepLink);
                call.resolve(ret);
                activity.pendingDeepLink = null; // Clear after use
            } else {
                call.resolve();
            }
        }
    }
}
