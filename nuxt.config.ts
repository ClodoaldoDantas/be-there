import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        commaDangle: 'never',
        indent: 2
      }
    }
  }
})
