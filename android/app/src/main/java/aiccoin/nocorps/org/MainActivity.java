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
        setIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        String action = intent.getAction();
        Uri data = intent.getData();
        
        if (Intent.ACTION_VIEW.equals(action) && data != null) {
            Log.d(TAG, "Deep link received: " + data.toString());
            
            // Extract the path and query parameters
            String scheme = data.getScheme(); // "https" or "aiccoin"
            String host = data.getHost();     // "aiccoin.netlify.app" or null
            String path = data.getPath();     // "/register" or null
            String query = data.getQuery();   // "ref=ABCDEF" or null
            
            // Store the URL for use in the web app
            pendingDeepLink = data.toString();
            
            // If the web view is already initialized, pass the URL
            if (this.bridge != null && this.bridge.getWebView() != null) {
                // Use JavaScript to handle the deep link in the web app
                String jsCall = String.format(
                    "window.dispatchEvent(new CustomEvent('deepLinkOpen', { detail: { url: '%s' } }));",
                    pendingDeepLink.replace("'", "\\'")
                );
                this.bridge.getWebView().evaluateJavascript(jsCall, null);
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
