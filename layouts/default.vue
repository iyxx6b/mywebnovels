<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="elevation-1 dark-drawer"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="drawer-item"
        >
          <v-list-item-action>
            <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="grey darken-4"
      dark
      class="elevation-2"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold app-title">
        <v-icon left color="primary" class="mr-2">mdi-rocket-outline</v-icon>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon color="grey lighten-1">mdi-chevron-{{ miniVariant ? 'right' : 'left' }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon color="grey lighten-1">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="main-bg">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      class="elevation-1 dark-drawer"
    >
      <v-list dense>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon color="primary">mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app class="justify-center py-3 dark-footer">
      <span class="footer-text">&copy; {{ new Date().getFullYear() }} {{ title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'mdi-home-outline', title: 'Home', to: '/' },
        { icon: 'mdi-login-variant', title: 'Login', to: '/login' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Project X',
    }
  },
}
</script>

<style scoped>
.dark-drawer {
  background: #181a20 !important;
  color: #fff;
}
.drawer-item {
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background 0.2s;
}
.drawer-item:hover {
  background: rgba(33, 150, 243, 0.08);
}
.app-title {
  letter-spacing: 2px;
  font-size: 1.3rem;
}
.main-bg {
  background: linear-gradient(135deg, #232526 0%, #1c1c1c 100%);
  min-height: 100vh;
  padding-top: 24px;
}
.dark-footer {
  background: #181a20 !important;
  color: #bdbdbd;
  border-top: 1px solid #222;
}
.footer-text {
  font-size: 1rem;
  letter-spacing: 1px;
}
</style>