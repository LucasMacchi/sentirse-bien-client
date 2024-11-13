import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentirsebien.app',
  appName: 'sentirse-bien-client',
  webDir: 'dist',
  server: {
    hostname: 'sentirse-bien-client.app.com'
  }
};

export default config;
