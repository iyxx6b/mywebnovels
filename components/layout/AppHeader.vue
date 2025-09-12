<template>
  <v-app-bar
    fixed
    app
    :color="$vuetify.theme.dark ? 'primary' : 'surface'"
    :dark="$vuetify.theme.dark"
    elevate-on-scroll
    class="app-header"
  >
    <v-app-bar-nav-icon @click.stop="toggleLeftDrawer" />

    <v-toolbar-title class="app-title text-uppercase font-weight-bold ml-2">
      <nuxt-link to="/" class="text-decoration-none">
        <span :class="{'white--text': $vuetify.theme.dark, 'black--text': !$vuetify.theme.dark}">Novel</span>
        <span class="accent--text">Verse</span>
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items class="d-none d-md-flex">
      <v-btn text to="/" class="nav-button">หน้าแรก</v-btn>
      <v-btn text to="/novels" class="nav-button">นิยายทั้งหมด</v-btn>
      <v-btn v-if="isAdmin" text to="/admin/users" class="nav-button">
        <v-icon left>mdi-shield-account</v-icon>
        จัดการผู้ใช้
      </v-btn>
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

    <!-- ================================================================= -->
    <!-- ===== จุดที่แก้ไข: เพิ่ม v-if/v-else สำหรับแสดงปุ่ม ===== -->
    <!-- ================================================================= -->
    <!-- ถ้าผู้ใช้ล็อกอินแล้ว (isAuthenticated เป็น true) -->
    <template v-if="isAuthenticated">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="nav-button">
            <v-icon left>mdi-account-circle</v-icon>
            {{ loggedInUser.username || 'User' }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile">
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>โปรไฟล์</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout">
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- ถ้าผู้ใช้ยังไม่ได้ล็อกอิน (isAuthenticated เป็น false) -->
    <template v-else>
      <v-btn text to="/login" class="mx-1 nav-button">
        <span class="d-none d-sm-inline">เข้าสู่ระบบ</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn outlined to="/register" class="mx-1 register-button">
        <span class="d-none d-sm-inline">สมัครสมาชิก</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <!-- ================================================================= -->

    <v-btn icon @click="toggleTheme" class="ml-2">
      <v-icon :color="$vuetify.theme.dark ? 'yellow darken-1' : 'grey darken-3'">
        {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-gibbous' }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'isAdmin'])
  },
  methods: {
    ...mapActions(['logout']),
    toggleTheme () {
      if (this.$vuetify && this.$vuetify.theme) {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        if (process.client) {
          localStorage.setItem('darkTheme', this.$vuetify.theme.dark);
        }
      }
    },
    toggleLeftDrawer() {
      this.$root.$emit('toggle-left-drawer');
    },
    handleLogout() {
      this.logout();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* Styles ของคุณ (เหมือนเดิม) */
.app-header {
 border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.v-application--light .app-header {
 border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.app-title {
 font-family: 'Cinzel', serif;
 letter-spacing: 1.5px;
 font-size: 1.5rem;
}
.nav-button {
 font-family: 'Merriweather', serif;
 font-weight: 500;
 letter-spacing: 0.5px;
}
.register-button {
 font-family: 'Merriweather', serif;
 font-weight: 500;
 letter-spacing: 0.5px;
 border-color: rgba(187, 134, 252, 0.7) !important;
 color: #BB86FC !important;
}
.v-application--light .register-button {
 border-color: #7E57C2 !important;
 color: #7E57C2 !important;
}
.search-input.v-text-field--solo-inverted .v-input__control {
 border-radius: 20px;
}
.v-application--light .v-toolbar__content .v-btn {
 color: #424242 !important;
}
</style>

