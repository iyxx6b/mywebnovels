<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="elevation-12" color="surface">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="fantasy-font">
              <v-icon left>mdi-book-edit</v-icon>
              จารึกนามนักเดินทาง
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-8">
            <v-alert v-if="successMessage" type="success" dense text prominent class="mb-6">
              {{ successMessage }}
            </v-alert>

            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleRegister">
              <!-- Name Input -->
              <label class="font-weight-bold">นามแฝงของคุณ</label>
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                placeholder="ระบุนามที่จะถูกจารึก"
                prepend-inner-icon="mdi-account"
                required
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <!-- Email Input -->
              <label class="font-weight-bold">จดหมายอิเล็กทรอนิกส์</label>
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
                placeholder="สำหรับรับข่าวสารจากอาณาจักร"
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
                placeholder="อย่างน้อย 8 อักขระ"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <!-- Confirm Password Input -->
              <label class="font-weight-bold">ยืนยันรหัสผ่านลับ</label>
              <v-text-field
                v-model="form.confirmPassword"
                :rules="[...rules.confirmPassword, passwordConfirmationRule]"
                placeholder="กรอกรหัสผ่านลับอีกครั้ง"
                prepend-inner-icon="mdi-lock-check"
                :type="showPass ? 'text' : 'password'"
                required
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <!-- Gender Selection -->
              <label class="font-weight-bold">เพศกำเนิด</label>
              <v-radio-group v-model="form.gender" :rules="rules.gender" row class="mt-0">
                <v-radio label="ชาย" value="male"></v-radio>
                <v-radio label="หญิง" value="female"></v-radio>
                <v-radio label="อื่น ๆ" value="other"></v-radio>
              </v-radio-group>

              <!-- Interests Selection -->
              <label class="font-weight-bold">หมวดหมู่นิยายที่สนใจ</label>
              <v-select
                v-model="form.interests"
                :items="interestOptions"
                :rules="rules.interests"
                label="เลือกอย่างน้อย 1 ประเภท"
                multiple
                chips
                deletable-chips
                outlined
                dense
                class="mb-4"
              ></v-select>

              <v-alert v-if="error" type="error" dense text class="mt-4">
                {{ error }}
              </v-alert>

            </v-form>
          </v-card-text>

          <v-card-actions class="pa-4">
            <nuxt-link to="/login">มีบัญชีอยู่แล้ว?</nuxt-link>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="accent"
              @click="handleRegister"
              :loading="loading"
              x-large
              class="fantasy-font"
            >
              ลงทะเบียน
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      error: null,
      successMessage: null,
      showPass: false,
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: null,
        interests: [],
      },
      interestOptions: [
        'แฟนตาซี (Fantasy)',
        'กำลังภายใน (Wuxia)',
        'ไซไฟ (Sci-Fi)',
        'สยองขวัญ (Horror)',
        'รักโรแมนติก (Romance)',
        'ผจญภัย (Adventure)',
      ],
      rules: {
        name: [v => !!v || 'จำเป็นต้องระบุนามแฝง'],
        email: [
          v => !!v || 'จำเป็นต้องระบุอีเมล',
          v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
        ],
        password: [
          v => !!v || 'จำเป็นต้องระบุรหัสผ่าน',
          v => (v && v.length >= 8) || 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
        ],
        confirmPassword: [v => !!v || 'จำเป็นต้องยืนยันรหัสผ่าน'],
        gender: [v => !!v || 'กรุณาเลือกเพศ'],
        interests: [v => v.length > 0 || 'กรุณาเลือกความสนใจอย่างน้อย 1 ประเภท'],
      },
    };
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.form.password === this.form.confirmPassword || 'รหัสผ่านไม่ตรงกัน';
    },
  },
  methods: {
    async handleRegister() {
      // ตรวจสอบความถูกต้องของฟอร์มทั้งหมดก่อน
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.error = null;
        this.successMessage = null;
        try {
          // ส่งข้อมูลไปที่ Backend (เราจะแก้ไข register.php ในขั้นตอนต่อไป)
          await this.$axios.post('/register.php', this.form);

          // แสดงข้อความสำเร็จ
          this.successMessage = 'ลงทะเบียนสำเร็จ! ยินดีต้อนรับสู่อาณาจักรของเรา';
          this.$refs.form.reset(); // ล้างข้อมูลในฟอร์ม
        } catch (err) {
          this.error = err.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน';
        } finally {
          this.loading = false;
        }
      }
    },
  },
  head: {
    title: 'Register'
  }
};
</script>

<style scoped>
.fantasy-font {
  font-family: 'Cinzel', serif; /* ใช้ Font ที่เรา import ไว้ใน nuxt.config.js */
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
```