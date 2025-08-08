<template>
  <v-footer app>
    <v-col class="text-center" cols="12">
      &copy; {{ new Date().getFullYear() }} — <strong>James Novels</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter', // ตั้งชื่อ component
  // คุณสามารถเพิ่ม props, data, methods, computed properties ได้ตามต้องการ
}
</script>

<style scoped>
/* คุณสามารถเพิ่ม CSS ที่มีขอบเขตเฉพาะ component นี้ได้ */
</style>