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
        <v-img src="/logo.png"></v-img>
      </v-list-item-avatar>
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
        v-for="(item, i) in filteredItems"
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
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    },
    // เปลี่ยนชื่อ props เพื่อให้ชัดเจนขึ้น
    navItems: {
      type: Array,
      default: () => []
    },
    clipped: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // สร้าง computed property เพื่อกรองรายการเมนู
    filteredItems() {
      // ใช้ Vuex store เพื่อตรวจสอบสถานะผู้ดูแลระบบ
      const isAdmin = this.$store.state.isAdmin;
      
      // กรองรายการเมนู: แสดงเมนู 'จัดการนิยาย' เฉพาะเมื่อผู้ใช้เป็น Admin
      return this.navItems.filter(item => {
        if (item.to === '/admin/novels') {
          return isAdmin;
        }
        return true;
      });
    }
  }
}
</script>

<style scoped>
/* Scoped styles for the left navigation drawer */
.nav-drawer {
  /* add styles here */
}
.list-item-text {
  font-family: 'Merriweather', serif;
  font-size: 0.95rem;
}
</style>