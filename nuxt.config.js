export default {
  // Global page headers
  head: {
    titleTemplate: '%s - NovelVerse',
    title: 'NovelVerse',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ยินดีต้อนรับสู่โลกแห่งนิยายแฟนตาซี' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // --- ส่วนสำคัญ: Import Fonts สำหรับธีมแฟนตาซี ---
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Merriweather:wght@300;400;700&display=swap', rel: 'stylesheet' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/vuetify', // Vuetify ต้องอยู่ที่นี่
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Axios module configuration
  // --- ที่อยู่ของ Backend API ของคุณ ---
  axios: {
    baseURL: 'http://localhost/db_webnovels/api'
  },
  
  // --- เปิดใช้งาน Vue Devtools ---
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true, // ตั้งค่า Dark Mode เป็นค่าเริ่มต้น
      themes: {
        dark: {
          primary: '#212121',
          accent: '#BB86FC',
          secondary: '#363636',
          surface: '#1E1E1E'
        },
        light: {
          primary: '#424242',
          accent: '#7E57C2',
          secondary: '#616161',
          surface: '#FFFFFF'
        }
      }
    }
  },

  // Build Configuration
  build: {}
}