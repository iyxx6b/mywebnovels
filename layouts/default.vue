<template>
  <v-app :dark="$vuetify.theme.dark">
    <AppHeader />
    <AppNavDrawerLeft :drawer.sync="drawer" :mini-variant.sync="miniVariant" :items="filteredNavItems" />
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
      drawer: false,
      miniVariant: false,
      rightDrawer: false,
      fixed: false,
      clipped: false,
      allNavItems: [ 
        { icon: 'mdi-home', title: 'หน้าแรก', to: '/', color: 'accent' },
        { icon: 'mdi-book-open-variant', title: 'นิยายทั้งหมด', to: '/novels', color: 'accent' },
        { icon: 'mdi-format-list-bulleted-type', title: 'หมวดหมู่', to: '/categories', color: 'accent' },
        { icon: 'mdi-fire', title: 'นิยายยอดนิยม', to: '/popular', color: 'accent' },
        { icon: 'mdi-comment-multiple-outline', title: 'คอมมูนิตี้', to: '/community', color: 'accent' },
        { icon: 'mdi-email', title: 'ติดต่อเรา', to: '/contact', color: 'accent' },
        { icon: 'mdi-information-outline', title: 'เกี่ยวกับเรา', to: '/about', color: 'accent' },
        { icon: 'mdi-account-cog', title: 'จัดการนิยาย', to: '/admin', color: 'accent' }
      ]
    }
  },
  computed: {
    filteredNavItems() {
      const isAdmin = this.$store.state && typeof this.$store.state.isAdmin !== 'undefined'
        ? this.$store.state.isAdmin
        : false;
      return this.allNavItems.filter(item => {
        if (item.to === '/admin') {
          return isAdmin;
        }
        return true;
      });
    }
  },
  mounted() {
    if (process.client && this.$vuetify) {
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme !== null) {
        this.$vuetify.theme.dark = JSON.parse(savedTheme);
      }
    }
    // ใช้ $root แทน $nuxt เพื่อความปลอดภัย
    this.$root.$on('toggle-left-drawer', this.toggleLeftDrawer);
    this.$root.$on('toggle-right-drawer', this.toggleRightDrawer);
  },
  beforeDestroy() {
    this.$root.$off('toggle-left-drawer', this.toggleLeftDrawer);
    this.$root.$off('toggle-right-drawer', this.toggleRightDrawer);
  },
  methods: {
    toggleLeftDrawer() {
      this.drawer = !this.drawer;
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
    }
  }
}
</script>