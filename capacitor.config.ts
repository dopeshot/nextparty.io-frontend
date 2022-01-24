import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "android.nextparty.io",
  appName: "nextparty",
  webDir: "build",
  bundledWebRuntime: false,
  overrideUserAgent:
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
};

export default config;
