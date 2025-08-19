<template>
  <v-app :dark="$vuetify.theme.dark">
    <AppHeader />
    
    <AppNavDrawerLeft :drawer.sync="drawer" :mini-variant.sync="miniVariant" :items="navItems" />
    
    <AppNavDrawerRight :rightDrawer.sync="rightDrawer" />

    <v-main>
      <v-container fluid class="main-content-container py-0">
        <nuxt />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
// Import your layout components
import AppHeader from '~/components/layout/AppHeader.vue'
import AppNavDrawerLeft from '~/components/layout/AppNavDrawerLeft.vue'
import AppNavDrawerRight from '~/components/layout/AppNavDrawerRight.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppNavDrawerLeft,
    AppNavDrawerRight,
    AppFooter
  },
  data () {
    return {
      drawer: false, // Controls the left drawer
      miniVariant: false,
      rightDrawer: false, // Controls the right drawer
      fixed: false, // For the footer
      clipped: false, // For the app bar
      navItems: [ // Navigation menu for the left drawer
        { icon: 'mdi-home', title: 'หน้าแรก', to: '/', color: 'accent' },
        { icon: 'mdi-book-open-variant', title: 'นิยายทั้งหมด', to: '/novels', color: 'accent' },
        { icon: 'mdi-format-list-bulleted-type', title: 'หมวดหมู่', to: '/categories', color: 'accent' },
        { icon: 'mdi-fire', title: 'นิยายยอดนิยม', to: '/popular', color: 'accent' },
        { icon: 'mdi-comment-multiple-outline', title: 'คอมมูนิตี้', to: '/community', color: 'accent' },
        { icon: 'mdi-email', title: 'ติดต่อเรา', to: '/contact', color: 'accent' },
        { icon: 'mdi-information-outline', title: 'เกี่ยวกับเรา', to: '/about', color: 'accent' }
      ]
    }
  },
  mounted() {
    // Load saved theme on component mount
    if (process.client && this.$vuetify && this.$vuetify.theme) {
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme !== null) {
        this.$vuetify.theme.dark = JSON.parse(savedTheme);
      }
    } else {
      console.warn('Vuetify theme object not available on mounted. Check Vuetify setup.');
    }

    // Listen for events from AppHeader to toggle drawers
    this.$nuxt.$on('toggle-left-drawer', () => {
      this.drawer = !this.drawer;
    });
    this.$nuxt.$on('toggle-right-drawer', () => {
      this.rightDrawer = !this.rightDrawer;
    });
  },
  beforeDestroy() {
    // Remove event listeners before component is destroyed
    this.$nuxt.$off('toggle-left-drawer');
    this.$nuxt.$off('toggle-right-drawer');
  }
}
</script>