<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    :right="right"
    temporary
    fixed
    width="300"
    :color="isDark ? 'secondary' : 'surface'"
    :dark="isDark"
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
  // =================================================================
  // ===== จุดที่แก้ไข: สร้าง isDark ขึ้นมาเก็บสถานะชั่วคราว =====
  // =================================================================
  data() {
    return {
      right: true,
      isDark: true // ตั้งค่าเริ่มต้นเป็น true (dark mode)
    }
  },
  // =================================================================
  // ===== จุดที่แก้ไข: เพิ่ม mounted และ watch =====
  // =================================================================
  watch: {
    // คอยดูว่าค่า theme ใน vuetify เปลี่ยนแปลงหรือไม่
    '$vuetify.theme.dark'(newVal) {
      this.isDark = newVal;
    }
  },
  mounted() {
    // mounted จะทำงานเฉพาะในเบราว์เซอร์เท่านั้น
    // เราจะอัปเดตค่า isDark ที่แท้จริงหลังจากที่หน้าเว็บโหลดในเบราว์เซอร์เสร็จแล้ว
    if (process.client) {
      this.isDark = this.$vuetify.theme.dark;
    }
  },
  methods: {
    closeRightDrawer() {
      // Use $emit to update the prop in the parent component
      this.$emit('update:rightDrawer', false);
    }
  }
}
</script>

<style scoped>
.right-drawer-border {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
</style>