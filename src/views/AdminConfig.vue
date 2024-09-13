<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    aaaaaaaaaaaaaaaaaaaaaaaaaa
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: 'admin_horus@gmail.com',
        password: '123',
      },
    };
  },

  methods: {
    async login() {
      const response = await this.$http.post('/admin/login', this.form);
      console.log(response)
    },
  },
};
</script>

