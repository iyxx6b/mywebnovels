<template>
  <!-- กลับมาใช้โค้ดแบบเดิมที่ถูกต้องได้เลย -->
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
import { mapGetters } from 'vuex'
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
      allNavItems: [
          { icon: 'mdi-home', title: 'หน้าแรก', to: '/', color: 'accent' },
          { icon: 'mdi-book-open-variant', title: 'นิยายทั้งหมด', to: '/novels', color: 'accent' },
          { icon: 'mdi-format-list-bulleted-type', title: 'หมวดหมู่', to: '/categories', color: 'accent' },
          { icon: 'mdi-account-cog', title: 'จัดการนิยาย', to: '/admin/novels', color: 'accent', adminOnly: true },
          { icon: 'mdi-account-group', title: 'จัดการผู้ใช้', to: '/admin/users', color: 'accent', adminOnly: true }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    filteredNavItems() {
      if (this.isAdmin) {
        return this.allNavItems;
      }
      return this.allNavItems.filter(item => !item.adminOnly);
    }
  },
  created() {
    this.$store.commit('INITIALIZE_STORE');
  },
  mounted() {
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