<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-sheet
          :color="$vuetify.theme.dark ? 'surface' : 'white'"
          elevation="4"
          rounded="lg"
          class="pa-6 pa-md-8 my-8"
        >
          <v-row class="text-center mb-8">
            <v-col cols="12">
              <h1 class="display-2 font-weight-bold mb-3" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">
                ✉️ ติดต่อเรา
              </h1>
              <p class="subtitle-1 grey--text text--darken-1">
                หากมีคำถาม ข้อเสนอแนะ หรือปัญหาในการใช้งาน โปรดแจ้งให้เราทราบ
              </p>
            </v-col>
          </v-row>

          <v-divider class="my-8"></v-divider>

          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="contactForm.name"
              label="ชื่อของคุณ"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="contactForm.email"
              label="อีเมล"
              type="email"
              outlined
              required
            ></v-text-field>

            <v-textarea
              v-model="contactForm.message"
              label="ข้อความ"
              outlined
              required
            ></v-textarea>

            <v-btn
              color="accent"
              class="mt-4"
              large
              block
              type="submit"
            >
              <v-icon left>mdi-send</v-icon>
              ส่งข้อความ
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // โค้ดสำหรับส่งข้อมูลไปยัง API (ต้องเขียนเพิ่มเติม)
      console.log('ข้อมูลที่ส่ง:', this.contactForm);
      alert('ส่งข้อความสำเร็จแล้ว!');
      // รีเซ็ตฟอร์มหลังจากส่งข้อมูล
      this.$refs.form.reset();
    }
  },
  head() {
    return {
      title: 'ติดต่อเรา - NovelVerse',
      meta: [
        { hid: 'description', name: 'description', content: 'ช่องทางการติดต่อทีมงาน NovelVerse' }
      ]
    }
  }
}
</script>

<style scoped>
/* สไตล์เฉพาะสำหรับคอมโพเนนต์นี้ */
</style>