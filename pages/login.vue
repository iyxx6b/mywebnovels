<!-- frontend/pages/login.vue -->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" color="surface">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="fantasy-font">ประตูมิติสู่ NovelVerse</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-8">
            <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
              <label class="font-weight-bold">อีเมล หรือ นามแฝง</label>
              <v-text-field
                v-model="form.identifier"
                :rules="rules.identifier"
                placeholder="ระบุอีเมล หรือนามแฝงของคุณ"
                prepend-inner-icon="mdi-account"
                required outlined dense class="mb-4"
              ></v-text-field>

              <label class="font-weight-bold">รหัสผ่านลับ</label>
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
                placeholder="รหัสผ่านสำหรับเข้าประตูมิติ"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                required outlined dense class="mb-4"
              ></v-text-field>
              <v-alert v-if="error" type="error" dense text class="mt-4">{{ error }}</v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4">
            <nuxt-link to="/register">สร้างบัญชีใหม่</nuxt-link>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="accent" @click="handleLogin" :loading="loading" x-large class="fantasy-font">เปิดประตูมิติ</v-btn>
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
      valid: true, loading: false, error: null, showPass: false,
      form: { identifier: '', password: '' },
      rules: {
        identifier: [ v => !!v || 'จำเป็นต้องระบุอีเมลหรือนามแฝง' ],
        password: [v => !!v || 'จำเป็นต้องระบุรหัสผ่าน'],
      },
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true; this.error = null;
        const success = await this.login(this.form);
        this.loading = false;
        if (success) {
          this.$router.push('/');
        } else {
          this.error = 'ข้อมูลที่ใช้เข้าระบบไม่ถูกต้อง หรือไม่พบบัญชีนี้';
        }
      }
    },
  },
  head: { title: 'Login' }
};
</script>

<style scoped>
.fantasy-font { font-family: 'Cinzel', serif; font-weight: 700; }
label { display: block; margin-bottom: 4px; color: rgba(255, 255, 255, 0.7); }
.v-application.theme--light label { color: rgba(0,0,0,0.6); }
</style>