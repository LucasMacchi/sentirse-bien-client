import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        cors: {
            origin: 'https://sentirse-bien-api.up.railway.app', // Specify allowed origin(s)
            credentials: true,            // Allow credentials
        }
    }
})
