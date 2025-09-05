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
      <span :class="{'white--text': $vuetify.theme.dark, 'black--text': !$vuetify.theme.dark}">Novel</span>
      <span class="accent--text">Verse</span>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items class="d-none d-md-flex">
      <v-btn text to="/" class="nav-button">หน้าแรก</v-btn>
      <v-btn text to="/novels" class="nav-button">นิยายทั้งหมด</v-btn>
      <v-btn text to="/categories" class="nav-button">หมวดหมู่</v-btn>
      <v-btn text to="/admin" class="nav-button">
        <v-icon left>mdi-account-key</v-icon>
        Admin
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

    <v-btn text to="/register" class="mx-1 nav-button">
      <span class="d-none d-sm-inline">เข้าสู่ระบบ</span>
      <v-icon right>mdi-login</v-icon>
    </v-btn>
    <v-btn outlined to="/login" class="mx-1 register-button">
      <span class="d-none d-sm-inline">สมัครสมาชิก</span>
      <v-icon right>mdi-account-plus</v-icon>
    </v-btn>

    <v-btn icon @click="toggleTheme">
      <v-icon :color="$vuetify.theme.dark ? 'yellow darken-1' : 'grey darken-3'">
        {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-gibbous' }}
      </v-icon>
    </v-btn>

    <v-btn icon @click.stop="toggleRightDrawer" class="ml-2">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    toggleTheme () {
      if (this.$vuetify && this.$vuetify.theme) {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark);
      } else {
        console.warn('Vuetify theme object not available to toggle. Check Vuetify setup.');
      }
    },
    toggleLeftDrawer() {
      this.$nuxt.$emit('toggle-left-drawer');
    },
    toggleRightDrawer() {
      this.$nuxt.$emit('toggle-right-drawer');
    }
  }
}
</script>

<style scoped>
/* Styles for the App Bar and buttons */
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