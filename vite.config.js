import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/API_URL":
        "http://ec2-3-27-193-10.ap-southeast-2.compute.amazonaws.com:8080",
    },
  },
  plugins: [react()],
});
