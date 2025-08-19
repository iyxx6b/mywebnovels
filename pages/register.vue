<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card class="d-flex flex-column justify-center align-center ma-4" outlined>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          outlined
          dense
          color="teal"
          class="mb-3"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          outlined
          dense
          color="teal"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          class="mb-3"
        ></v-text-field>
      </v-form>

      <v-btn
        color="teal"
        dark
        large
        @click="submit"
        :disabled="!valid"
      >
        Submit
      </v-btn>

      <v-alert
        v-if="alert.success"
        type="success"
        dense
        border="left"
        color="teal lighten-4"
        class="mt-4"
      >
        {{ alert.success.text }}
      </v-alert>

      <v-alert
        v-if="alert.error"
        type="error"
        dense
        border="left"
        color="red lighten-4"
        class="mt-4"
      >
        {{ alert.error.text }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      alert: {
        success: null,
        error: null,
      }
    };
  },
  methods: {
    submit() {
      // Logic for form submission
      if (this.$refs.form.validate()) {
        // Here you would typically call an API to register the user
        console.log('Form submitted:', { email: this.email, password: this.password });

        // Simulate a successful registration
        this.alert.success = { text: 'Registration successful!' };
        this.alert.error = null;
        this.$refs.form.reset();
      } else {
        // Handle validation failure
        this.alert.error = { text: 'Please correct the form errors.' };
        this.alert.success = null;
      }
    }
  }
};
</script>

<style scoped>
/* Scoped styles specific to this component */
</style>