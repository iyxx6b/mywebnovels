<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" color="surface">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="fantasy-font">
              <v-icon left>mdi-key-variant</v-icon>
              ประตูมิติสู่ NovelVerse
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-8">
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleLogin">
              <!-- Email Input -->
              <label class="font-weight-bold">จดหมายอิเล็กทรอนิกส์</label>
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
                placeholder="ระบุอีเมลของนักเดินทาง"
                prepend-inner-icon="mdi-email"
                required
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <!-- Password Input -->
              <label class="font-weight-bold">รหัสผ่านลับ</label>
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
                placeholder="รหัสผ่านสำหรับเข้าประตูมิติ"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-alert v-if="error" type="error" dense text class="mt-4">
                {{ error }}
              </v-alert>

            </v-form>
          </v-card-text>

          <v-card-actions class="pa-4">
            <nuxt-link to="/register">สร้างบัญชีใหม่</nuxt-link>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="accent"
              @click="handleLogin"
              :loading="loading"
              x-large
              class="fantasy-font"
            >
              เปิดประตูมิติ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      loading: false,
      error: null,
      showPass: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || 'จำเป็นต้องระบุอีเมล',
          v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
        ],
        password: [v => !!v || 'จำเป็นต้องระบุรหัสผ่าน'],
      },
    };
  },
  methods: {
    ...mapActions(['login']), // เรียกใช้ action 'login' จาก Vuex store
    async handleLogin() {
      // ตรวจสอบความถูกต้องของฟอร์มก่อน
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.error = null;
        try {
          const success = await this.login(this.form); // ส่ง form data ทั้งหมดไปที่ action
          if (success) {
            this.$router.push('/'); // ถ้าสำเร็จ ให้ไปที่หน้าแรก
          } else {
            this.error = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
          }
        } catch (err) {
            this.error = 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
        } finally {
            this.loading = false;
        }
      }
    },
  },
  head: {
    title: 'Login'
  }
};
</script>

<style scoped>
.fantasy-font {
  font-family: 'Cinzel', serif;
  font-weight: 700;
}
label {
  display: block;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.7);
}
.v-application.theme--light label {
  color: rgba(0,0,0,0.6);
}
</style>
