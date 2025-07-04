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
              <span class="headline">ลงทะเบียนผู้ใช้งาน</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="form.name"
                  label="ชื่อ"
                  :rules="[v => !!v || 'กรุณากรอกชื่อ']"
                  outlined
                  dense
                  color="teal"
                  class="mb-3"
                />
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
                  :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน', v => v.length >= 6 || 'รหัสผ่านอย่างน้อย 6 ตัวอักษร']"
                  outlined
                  dense
                  color="teal"
                  class="mb-3"
                />
                <v-text-field
                  v-model="form.confirmPassword"
                  label="ยืนยันรหัสผ่าน"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="[v => !!v || 'กรุณายืนยันรหัสผ่าน', v => v === form.password || 'รหัสผ่านไม่ตรงกัน']"
                  outlined
                  dense
                  color="teal"
                  class="mb-3"
                />
                <v-radio-group
                  v-model="form.gender"
                  :rules="[v => !!v || 'กรุณาเลือกเพศ']"
                  row
                  class="mb-3"
                  color="teal"
                >
                  <v-radio label="ชาย" value="ชาย" />
                  <v-radio label="หญิง" value="หญิง" />
                  <v-radio label="อื่น ๆ" value="อื่น ๆ" />
                </v-radio-group>
                <v-select
                  v-model="form.interests"
                  :items="interests"
                  label="ความสนใจ"
                  multiple
                  chips
                  :rules="[v => v.length > 0 || 'กรุณาเลือกความสนใจ']"
                  outlined
                  dense
                  color="teal"
                  class="mb-4"
                />
                <v-btn
                  color="teal"
                  block
                  large
                  @click="submit"
                  :disabled="!valid"
                >
                  ลงทะเบียน
                </v-btn>
                <v-alert
                  v-if="success"
                  type="success"
                  class="mt-4"
                  border="left"
                  color="teal lighten-4"
                  text
                >
                  ลงทะเบียนสำเร็จ
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        interests: [],
      },
      interests: ['กีฬา', 'ดนตรี', 'ท่องเที่ยว', 'อ่านหนังสือ', 'เทคโนโลยี'],
      emailRules: [
        v => !!v || 'กรุณากรอกอีเมล',
        v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
      ],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 3000)
      }
    },
  },
}
</script>

<style scoped>
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
.v-radio input:checked + .v-radio__ripple .v-radio__selection {
  background: #009688 !important;
}
.v-select .v-input__append-inner .v-icon,
.v-text-field .v-input__append-inner .v-icon {
  color: #fff !important;
}
</style>