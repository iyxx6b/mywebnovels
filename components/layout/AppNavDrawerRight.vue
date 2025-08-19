<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    :right="right"
    temporary
    fixed
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
      <v-list-item to="/user/profile">
        <v-list-item-action>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>โปรไฟล์ของฉัน</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/settings">
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>ตั้งค่า</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="logoutUser">
        <v-list-item-action>
          <v-icon color="error">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>ออกจากระบบ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    rightDrawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      right: true
    }
  },
  methods: {
    closeRightDrawer() {
      this.$emit('update:rightDrawer', false);
    },
    logoutUser() {
      alert('Logout functionality to be implemented.');
    }
  }
}
</script>

<style scoped>
/* Scoped styles for the right navigation drawer */
.right-drawer-border {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}
.v-application--light .right-drawer-border {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
</style>