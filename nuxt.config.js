// nuxt.config.js

export default {
  // ... (ส่วนอื่นๆ ที่สร้างมาให้แล้ว)

  // ให้แน่ใจว่า 'ssr: true' หรือ 'mode: 'universal''
  ssr: true, // หรือ mode: 'universal',

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules (ถ้าคุณเลือก Axios หรืออื่นๆ)
  modules: [
    '@nuxtjs/axios',
  ],

  // ส่วนของ Head: เพิ่ม Google Fonts เพื่อใช้ฟอนต์ที่ดูแฟนตาซี
  head: {
    titleTemplate: '%s - NovelVerse',
    title: 'Home', // Default title
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Google Fonts for a classic/fantasy feel
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Merriweather:wght@300;400;700&display=swap', rel: 'stylesheet' }
    ]
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true, // ตั้งค่าเริ่มต้นเป็น Dark Mode ตามภาพตัวอย่าง
      themes: {
        light: {
          primary: '#424242',   // สีหลัก (Dark Grey for headings/primary elements)
          accent: '#7E57C2',    // สีเน้น (Purple for highlights/buttons)
          secondary: '#616161', // สีรอง (Grey for secondary text)
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5255',
          success: '#4CAF50',
          background: '#F0F2F5', // พื้นหลังอ่อน
          surface: '#FFFFFF'    // พื้นผิว Card/Sheet อ่อน
        },
        dark: {
          primary: '#212121',   // สีหลัก (Very Dark Grey for AppBar, Footer)
          accent: '#BB86FC',    // สีเน้น (Purple for highlights/buttons - lighter for dark mode)
          secondary: '#363636', // สีรอง (Dark Grey for drawer/some cards, slightly lighter than background)
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#CF6679',
          success: '#03DAC6',
          background: '#1a1a1a', // พื้นหลังเข้มที่สุด
          surface: '#2c2c2c'    // พื้นผิว Card/Sheet เข้ม
        }
      }
    }
  },

  // ... (ส่วนอื่นๆ เช่น axios, build, etc.)
}