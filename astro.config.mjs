import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://yoursite.com",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-sans",
        weights: [400, 500],
      }
    ],
  },
  vite: {
    plugins: [
      {
        name: 'fix-astro-module-type',
        enforce: 'post',
        load(id) {
          if (id.includes('astro:scripts')) {
            console.log('LOAD ID:', id);
          }
        },
        transform(code, id) {
          if (id.includes('astro:scripts')) {
            console.log('TRANSFORM ID:', id);
            return { code, moduleType: 'js' };
          }
        }
      },
      tailwindcss()
    ],
    optimizeDeps: {
      exclude: ['astro:env/server', 'astro:scripts/before-hydration.js']
    }
  },
  integrations: [
    sitemap(),
    process.env.NODE_ENV === 'development' ? react({
      include: ['**/*.{jsx,tsx}']
    }) : null,
    process.env.NODE_ENV === 'development' ? keystatic() : null
  ].filter(Boolean),
});
