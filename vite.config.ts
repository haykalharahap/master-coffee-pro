import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  server: {
    port: 5173,
    // Jika strictPort true, Vite akan langsung error jika 5173 terpakai, 
    // bukan pindah ke 5174. Ini membantu kamu sadar ada proses lain yang jalan.
    strictPort: true, 
    host: true
  }
});