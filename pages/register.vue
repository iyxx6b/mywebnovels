<template>
  <v-app>
    <v-main>
      <div class="dark-bg full-height d-flex align-center justify-center">
        <v-flex xs12 sm8 md4>
          <div class="text-center mb-5">
            <img
              src="/v.png"
              alt="Vuetify.js"
              style="width: 80px; height: 80px;"
            >
          </div>
          <v-card class="mx-auto pa-5" max-width="400" color="#23272f" elevation="2">
            <v-card-title class="justify-center">
              <span class="headline">เข้าสู่ระบบ</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="form.email"
                  label="อีเมล"
                  :rules="emailRules"
                  outlined
                  dense
                  color="teal"
                  class="mb-3"
                />
                <v-text-field
                  v-model="form.password"
                  label="รหัสผ่าน"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="passwordRules"
                  outlined
                  dense
                  color="teal"
                  class="mb-3"
                />
                <v-btn
                  color="teal"
                  block
                  large
                  @click="submit"
                  :disabled="!valid"
                >
                  เข้าสู่ระบบ
                </v-btn>
                <v-alert
                  v-if="success"
                  type="success"
                  class="mt-4"
                  border="left"
                  color="teal lighten-4"
                  text
                >
                  เข้าสู่ระบบสำเร็จ
                </v-alert>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      success: false,
      form: {
        email: '',
        password: '',
      },
      emailRules: [
        v => !!v || 'กรุณากรอกอีเมล',
        v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
      ],
      passwordRules: [
        v => !!v || 'กรุณากรอกรหัสผ่าน',
      ],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // ในความเป็นจริงโค้ดตรงนี้จะทำการส่งข้อมูลไปยัง API เพื่อตรวจสอบการเข้าสู่ระบบ
        console.log('ข้อมูลที่ส่ง:', this.form);

        // จำลองการเข้าสู่ระบบสำเร็จ
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    },
  },
}
</script>

<style scoped>
/* คุณสามารถใช้ CSS เดียวกันกับหน้าลงทะเบียนได้เลย */
.dark-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #181a20 0%, #23272f 100%);
}
.full-height {
  min-height: 100vh;
}
.v-card {
  background: #23272f !important;
  color: #fff !important;
}
.v-card-title,
.v-card-text,
.v-label,
.v-input__slot,
.v-select__selections,
.v-chip,
.v-alert {
  color: #fff !important;
}
.v-text-field input,
.v-select input,
.v-select__selection,
.v-radio label {
  color: #fff !important;
}
.v-btn {
  color: #fff !important;
  background: #009688 !important;
}
.v-alert {
  background: #263238 !important;
  border-left: 5px solid #009688 !important;
}
</style>