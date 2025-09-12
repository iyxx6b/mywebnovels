import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    // คุณสามารถนำ theme configuration จาก nuxt.config.js มาไว้ที่นี่ได้
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#212121',
          accent: '#BB86FC',
          secondary: '#363636',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#CF6679',
          success: '#4CAF50',
          background: '#121212',
          surface: '#1E1E1E'
        },
        light: {
          primary: '#424242',
          accent: '#7E57C2',
          secondary: '#616161',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5255',
          success: '#4CAF50',
          background: '#F0F2F5',
          surface: '#FFFFFF'
        }
      }
    }
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
