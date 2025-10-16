import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.APP_NAME || 'CheckedIn'
    }
  },

  compatibilityDate: '2025-07-15',

  css: ['./app/assets/css/main.css'],

  devServer: {
    port: 8080
  },

  devtools: { enabled: true },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],

  pages: true,

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || 'Checked In'
    }
  },

  ui: {
    fonts: false,
    prefix: 'Nuxt'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
