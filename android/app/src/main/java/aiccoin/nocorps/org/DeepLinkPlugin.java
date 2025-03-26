package aiccoin.nocorps.org;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DeepLinkPlugin")
public class DeepLinkPlugin extends Plugin {
    private static String lastDeepLink;

    public static void setLastDeepLink(String url) {
        lastDeepLink = url;
    }

    @PluginMethod
    public void getLastDeepLink(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("url", lastDeepLink != null ? lastDeepLink : "");
        call.resolve(ret);
        lastDeepLink = null; // Clear after use
    }
}