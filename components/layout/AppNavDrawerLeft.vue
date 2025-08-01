<template>
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
</template>

<script>
export default {
  // ต้องกำหนด props ให้รับค่า drawer, miniVariant, items มาจาก default.vue
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  }
  // ส่วนของ data และ methods ที่เกี่ยวข้องกับ drawer/miniVariant
  // ควรถูกส่งผ่าน props หรือใช้ Vuex/Pinia เพื่อจัดการ state
  // หากต้องการให้ AppNavDrawerLeft เปลี่ยนค่า drawer/miniVariant ให้ default.vue
  // ต้องใช้ event (เช่น this.$emit('update:drawer', !this.drawer))
  // หรือใช้ .sync modifier ใน parent (default.vue)
}
</script>

<style scoped>
/* สไตล์ที่เกี่ยวข้องกับ nav-drawer และ list-item-text */
.nav-drawer {
  /* สไตล์เดิมจาก default.vue */
}
.list-item-text {
  font-family: 'Merriweather', serif;
  font-size: 0.95rem;
}
</style>