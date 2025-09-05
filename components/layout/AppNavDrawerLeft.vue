<template>
  <v-navigation-drawer
    app
    v-model="localDrawer"
    :mini-variant="localMiniVariant"
    clipped
  >
    <!-- Header โลโก้ -->
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="/logo.png" alt="Logo"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">My Novel</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!-- รายการเมนู -->
    <v-list dense>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon :color="item.color">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- ปุ่มย่อ/ขยาย Drawer -->
    <v-divider></v-divider>
    <v-btn text block @click="toggleMini">
      <v-icon>{{ localMiniVariant ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavDrawerLeft',
  props: {
    drawer: {
      type: Boolean,
      default: false // เพิ่ม default
    },
    miniVariant: {
      type: Boolean,
      default: false // เพิ่ม default
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localDrawer: this.drawer
    }
  },
  watch: {
    drawer(val) {
      this.localDrawer = val
    },
    localDrawer(val) {
      this.$emit('update:drawer', val)
    }
  },
  computed: {
    localMiniVariant: {
      get() {
        return this.miniVariant
      },
      set(val) {
        this.$emit('update:miniVariant', val)
      }
    }
  },
  methods: {
    toggleMini() {
      this.localMiniVariant = !this.localMiniVariant
    }
  }
}
</script>
