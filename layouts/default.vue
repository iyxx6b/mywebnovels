<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
      class="global-background-img"
      :gradient="$vuetify.theme.dark ? 'to top, rgba(18,18,18,0.95), rgba(1,1,10,0.98)' : 'to top, rgba(240,242,245,0.95), rgba(255,255,255,0.98)'"
      height="100vh"
      cover
    ></v-img>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :color="$vuetify.theme.dark ? 'primary' : 'surface'"
      :dark="$vuetify.theme.dark"
      elevate-on-scroll
      class="app-header"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title class="app-title text-uppercase font-weight-bold ml-2">
        <span :class="{'white--text': $vuetify.theme.dark, 'black--text': !$vuetify.theme.dark}">Novel</span>
        <span class="accent--text">Verse</span>
      </v-toolbar-title>
      
      <v-spacer />

      <v-toolbar-items class="d-none d-md-flex">
        <v-btn text to="/" class="nav-button">หน้าแรก</v-btn>
        <v-btn text to="/novels" class="nav-button">นิยายทั้งหมด</v-btn>
        <v-btn text to="/categories" class="nav-button">หมวดหมู่</v-btn>
        <v-btn text to="/community" class="nav-button">คอมมูนิตี้</v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-responsive max-width="250" class="mx-4 d-none d-sm-flex">
        <v-text-field
          dense
          flat
          solo-inverted
          hide-details
          rounded
          label="ค้นหานิยาย..."
          prepend-inner-icon="mdi-magnify"
          class="search-input"
          :background-color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-3'"
        ></v-text-field>
      </v-responsive>

      <v-btn text to="/login" class="mx-1 nav-button">
        <span class="d-none d-sm-inline">เข้าสู่ระบบ</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn outlined to="/register" class="mx-1 register-button">
        <span class="d-none d-sm-inline">สมัครสมาชิก</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>

      <v-btn icon @click="toggleTheme">
        <v-icon :color="$vuetify.theme.dark ? 'yellow darken-1' : 'grey darken-3'">
          {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-gibbous' }}
        </v-icon>
      </v-btn>
      
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="ml-2">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :color="$vuetify.theme.dark ? 'secondary' : 'surface'"
      :dark="$vuetify.theme.dark"
      class="nav-drawer"
    >
      <v-list-item class="px-2 py-4">
        <v-list-item-avatar>
          <v-img src="/logo.png"></v-img> </v-list-item-avatar>
        <v-list-item-title class="app-title white--text">NovelVerse</v-list-item-title>
        <v-btn
          icon
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon :color="item.color || 'white'">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="list-item-text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="main-content-container py-0">
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      :color="$vuetify.theme.dark ? 'secondary' : 'surface'"
      :dark="$vuetify.theme.dark"
      class="nav-drawer right-drawer-border"
    >
      <v-list>
        <v-list-item class="text-right">
          <v-list-item-action class="ml-auto">
            <v-btn icon @click.stop="rightDrawer = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item to="/user/profile">
          <v-list-item-action><v-icon>mdi-account-circle</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>โปรไฟล์ของฉัน</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item to="/settings">
          <v-list-item-action><v-icon>mdi-cog</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>ตั้งค่า</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logoutUser">
          <v-list-item-action><v-icon color="error">mdi-logout</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>ออกจากระบบ</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app :color="$vuetify.theme.dark ? 'primary' : 'surface'" :dark="$vuetify.theme.dark">
      <span :class="{'white--text': $vuetify.theme.dark, 'black--text': !$vuetify.theme.dark}">&copy; {{ new Date().getFullYear() }} NovelVerse. All rights reserved.</span>
      <v-spacer></v-spacer>
      <v-btn icon small class="mx-1" href="#" target="_blank">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" href="#" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false, // For controlling if content is clipped by drawer
      drawer: false,  // Controls left navigation drawer visibility
      fixed: false,   // Controls if footer is fixed
      items: [
        { icon: 'mdi-home', title: 'หน้าแรก', to: '/', color: 'accent' },
        { icon: 'mdi-book-open-variant', title: 'นิยายทั้งหมด', to: '/novels', color: 'accent' },
        { icon: 'mdi-format-list-bulleted-type', title: 'หมวดหมู่', to: '/categories', color: 'accent' },
        { icon: 'mdi-fire', title: 'นิยายยอดนิยม', to: '/popular', color: 'accent' },
        { icon: 'mdi-comment-multiple-outline', title: 'คอมมูนิตี้', to: '/community', color: 'accent' },
        { icon: 'mdi-email', title: 'ติดต่อเรา', to: '/contact', color: 'accent' },
        { icon: 'mdi-information-outline', title: 'เกี่ยวกับเรา', to: '/about', color: 'accent' }
      ],
      miniVariant: false, // For mini variant of left drawer
      right: true,    // Right position for right drawer
      rightDrawer: false, // Controls right navigation drawer visibility
      // title: 'NovelVerse' // App title, now combined in template
    }
  },
  methods: {
    toggleTheme () {
      // ตรวจสอบให้แน่ใจว่า this.$vuetify และ this.$vuetify.theme มีค่า
      if (this.$vuetify && this.$vuetify.theme) {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark); // Persist theme choice
      } else {
        console.warn('Vuetify theme object not available to toggle. Check Vuetify setup.');
      }
    },
    logoutUser() {
      // Logic for user logout (e.g., clear tokens, redirect)
      alert('Logout functionality to be implemented.');
      // Example: this.$auth.logout();
      // this.$router.push('/login');
    }
  },
  mounted() {
    // โหลด Theme ที่บันทึกไว้เมื่อ Component ถูก Mount
    if (process.client && this.$vuetify && this.$vuetify.theme) { // process.client เพื่อให้แน่ใจว่ารันเฉพาะฝั่ง Client
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme !== null) {
        this.$vuetify.theme.dark = JSON.parse(savedTheme);
      }
    } else {
      console.warn('Vuetify theme object not available on mounted. Check Vuetify setup.');
    }
  }
}
</script>

<style scoped>
/* Global background image style */
.global-background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  filter: blur(4px) brightness(0.4); /* เพิ่มความเบลอและความมืด */
  transition: filter 0.5s ease-in-out;
}

/* App Bar / Header */
.app-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* เส้นคั่นบางๆ */
}
.v-application--light .app-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.app-title {
  font-family: 'Cinzel', serif; /* ฟอนต์แฟนตาซีสำหรับชื่อแอป */
  letter-spacing: 1.5px;
  font-size: 1.5rem;
}

/* Navigation Buttons in App Bar */
.nav-button {
  font-family: 'Merriweather', serif;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.register-button {
  font-family: 'Merriweather', serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  /* Custom color for outlined button in dark mode */
  border-color: rgba(187, 134, 252, 0.7) !important;
  color: #BB86FC !important;
}
.v-application--light .register-button {
  border-color: #7E57C2 !important;
  color: #7E57C2 !important;
}

/* Navigation Drawer (Sidebar) */
.nav-drawer {
  /* ไม่มี box-shadow หรือ border พิเศษ เพราะใช้ elevation ของ Vuetify */
}

.list-item-text {
  font-family: 'Merriweather', serif; /* ฟอนต์อ่านง่ายสำหรับรายการ */
  font-size: 0.95rem;
}

/* Right Drawer specific style if needed */
.right-drawer-border {
    border-left: 1px solid rgba(255, 255, 255, 0.1); /* เส้นคั่นสำหรับ drawer ขวา */
}
.v-application--light .right-drawer-border {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

/* Search input specific styles */
.search-input.v-text-field--solo-inverted .v-input__control {
  border-radius: 20px; /* ขอบโค้งสำหรับช่องค้นหา */
}

/* Main Content Area */
.main-content-container {
  min-height: calc(100vh - 64px - 50px); /* ปรับความสูงตาม App Bar และ Footer */
  position: relative;
  z-index: 1; /* ให้เนื้อหาอยู่ด้านบนสุด */
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Overrides for Vuetify components in light mode for better visibility */
.v-application--light .v-toolbar__content .v-btn {
  color: #424242 !important; /* Text color for buttons in light mode app bar */
}
</style>