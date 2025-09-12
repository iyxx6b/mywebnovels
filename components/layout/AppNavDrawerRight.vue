<template>
  <v-navigation-drawer
    v-model="localRightDrawer"
    :right="right"
    temporary
    fixed
    width="300"
    :color="$vuetify.theme.dark ? 'secondary' : 'surface'"
    :dark="$vuetify.theme.dark"
    class="nav-drawer right-drawer-border"
  >
    <v-list>
      <v-list-item class="text-right">
        <v-list-item-action class="ml-auto">
          <v-btn icon @click.stop="closeRightDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Notifications
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-bell-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>No new notifications</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavDrawerRight',
  props: {
    rightDrawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      right: true,
    }
  },
  computed: {
      localRightDrawer: {
          get() {
              return this.rightDrawer;
          },
          set(value) {
              this.$emit('update:rightDrawer', value);
          }
      }
  },
  methods: {
    closeRightDrawer() {
      this.localRightDrawer = false;
    }
  }
}
</script>

<style scoped>
.right-drawer-border {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
.v-application--light .right-drawer-border {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
</style>