<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h5">🔑 เข้าสู่ระบบ</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="ชื่อผู้ใช้"
            outlined
            dense
            required
          />
          <v-text-field
            v-model="password"
            label="รหัสผ่าน"
            type="password"
            outlined
            dense
            required
          />
          <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
          <v-btn color="primary" type="submit" block>เข้าสู่ระบบ</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: null,
      apiBase: "http://localhost/db_webnovels/",
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(this.apiBase + "login.php", {
          username: this.username,
          password: this.password,
        });

        if (res.data.success) {
          // เก็บข้อมูล user ไว้ใน localStorage
          localStorage.setItem("user", JSON.stringify(res.data.user));

          if (res.data.user.role === "admin") {
            this.$router.push("/admin"); // ไปหน้า admin
          } else {
            this.$router.push("/"); // ไปหน้า home
          }
        } else {
          this.error = res.data.message;
        }
      } catch (err) {
        console.error("Login error:", err);
        this.error = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      }
    },
  },
};
</script>
