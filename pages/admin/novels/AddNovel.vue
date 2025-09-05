<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet
          :color="$vuetify.theme.dark ? 'surface' : 'white'"
          elevation="4"
          rounded="lg"
          class="pa-6 pa-md-8 my-8"
        >
          <h1 class="display-2 font-weight-bold mb-3">เพิ่มนิยายใหม่</h1>
          <v-form @submit.prevent="addNovel">
            <v-text-field v-model="novel.title" label="ชื่อเรื่อง" required></v-text-field>
            <v-text-field v-model="novel.author" label="ผู้แต่ง" required></v-text-field>
            <v-textarea v-model="novel.description" label="คำอธิบาย" required></v-textarea>
            <v-text-field v-model="novel.genre" label="หมวดหมู่"></v-text-field>
            <v-text-field v-model="novel.coverUrl" label="URL รูปหน้าปก"></v-text-field>

            <v-btn type="submit" color="primary" class="my-4">เพิ่มนิยาย</v-btn>
          </v-form>
          
          <v-alert v-if="message" :type="messageType" dense text>
            {{ message }}
          </v-alert>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      novel: {
        title: '',
        author: '',
        description: '',
        genre: '',
        coverUrl: ''
      },
      message: '',
      messageType: ''
    };
  },
  methods: {
    async addNovel() {
      try {
        // ใช้ $axios ที่เราตั้งค่าไว้ใน nuxt.config.js
        const response = await this.$axios.post('http://localhost/db_webnovels/add_novel.php', this.novel, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        // ตรวจสอบสถานะการตอบกลับจาก API ของเรา
        if (response.status === 201) {
          this.message = 'เพิ่มนิยายสำเร็จ!';
          this.messageType = 'success';
          // ล้างฟอร์มเมื่อเพิ่มสำเร็จ
          this.novel.title = '';
          this.novel.author = '';
          this.novel.description = '';
          this.novel.genre = '';
          this.novel.coverUrl = '';
        }
      } catch (error) {
        this.message = 'เกิดข้อผิดพลาดในการเพิ่มนิยาย: ' + error.message;
        this.messageType = 'error';
      }
    }
  }
};
</script>