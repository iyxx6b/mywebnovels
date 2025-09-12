<template>
  <v-app :dark="isDark">
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
    },
    // **จุดที่แก้ไข:** สร้าง computed property เพื่อตรวจสอบก่อนใช้งาน
    isDark() {
      // ตรวจสอบว่า $vuetify.theme มีอยู่จริงหรือไม่ก่อนจะเข้าถึง .dark
      return this.$vuetify && this.$vuetify.theme ? this.$vuetify.theme.dark : true;
    }
  },
  created() {
    this.$store.commit('INITIALIZE_STORE');
  },
  mounted() {
    this.$root.$on('toggle-left-drawer', this.toggleLeftDrawer);
    this.$root.$on('toggle-right-drawer', this.toggleRightDrawer);
    
    // (เพิ่มเติม) โค้ดสำหรับโหลด theme ที่เคยบันทึกไว้
    if (process.client) {
      const isDark = localStorage.getItem('darkTheme');
      if (isDark !== null) {
        this.$vuetify.theme.dark = JSON.parse(isDark);
      }
    }
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