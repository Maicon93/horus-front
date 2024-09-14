<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-center text-2xl font-bold mb-6">Login</h2>
      <v-form>
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          outlined
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Senha"
          type="password"
          outlined
          class="mb-6"
        ></v-text-field>
        <v-btn
          color="black"
          class="w-full"
          @click="login"
        >
          <span class="text-white">Entrar</span>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: 'admin@gmail.com',
        password: '123',
      },
    };
  },

  methods: {
    async login() {
      await this.$http.post('/admin/login', this.form).then(resp => {
        localStorage.setItem('sessionHash', resp.body.sessionHash)
        this.$router.push('/admin-config');
      })
    },
  },
};
</script>

