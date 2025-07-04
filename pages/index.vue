<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5 rounded-lg elevation-5" color="grey darken-3">
          <v-card-title class="text-h5 font-weight-bold text-center justify-center mb-4">
            input
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="inputText"
              label="พิมพ์ข้อความที่นี่..."
              clearable
              outlined
              dense
              class="mb-4"
            ></v-text-field>
            <v-divider class="my-4"></v-divider>
            <Welcome />

            <v-alert
              v-if="inputText"
              type="success"
              border="left"
              colored-border
              elevation="2"
              class="mb-2"
            >
              <span class="font-weight-bold">ข้อความของคุณ:</span>
              <span class="primary--text ml-2">{{ inputText }}</span>
            </v-alert>
            <v-alert
              v-else
              type="info"
              border="left"
              colored-border
              elevation="2"
              class="mb-2"
            >
              <span class="grey--text">ยังไม่มีข้อความ</span>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Welcome from '~/components/welcome.vue';

export default {
  // ไม่จำเป็นต้อง import Logo หรือ VuetifyLogo เพราะเราลบออกแล้ว
  // layout: 'default', // หน้านี้จะยังคงใช้ layout หลักที่มี Navbar/Footer
                        // หากต้องการหน้าโล่งจริงๆ ต้องสร้าง layout/empty.vue แล้วใส่ layout: 'empty' ที่นี่
  components: {Welcome}, // นำเข้า component Welcome ที่เราสร้างไว้


  data() {
    return {
      inputText: '', // ตัวแปรสำหรับเก็บข้อความจาก Input
    }
  },
  head() {
    return {
      title: 'Realtime Input Demo',
    }
  },
}
</script>

<style scoped>
/* คุณสามารถเพิ่ม CSS เฉพาะของหน้านี้ได้ที่นี่ */
</style>