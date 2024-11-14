<template>
  <div style="position: fixed; right: 20px; bottom: 25px; z-index: 999;" class="bg-transparent flex gap-2">
    <img src="@/assets/images/instagram.png" width="50" class="cursor-pointer" @click="redirectInstagram"/>
    <img src="@/assets/images/whatsapp.png" width="50" class="cursor-pointer" @click="redirectWhatsapp"/>
  </div>

  <Navbar v-if="showNavbar"/>
  <RouterView />

  <RouterView name="admin"/>
  <ConfirmDialog ref="confirmDialog" />
</template>

<script>
  import ConfirmDialog from '@/components/functions/ConfirmDialog.vue';
  import Navbar from '@/components/normals/Navbar.vue'

export default {
  components: { ConfirmDialog, Navbar },

  provide() {
    return {
      $confirm: this.confirm
    };
  },

  computed: {
    showNavbar() {
      return this.$route?.meta?.requiresAuth || this.$route.path == '/admin' ? false : true;
    }
  },

  methods: {
    confirm(title, message, options = {}) {
      return this.$refs.confirmDialog.open(title, message, options);
    },

    redirectInstagram() {
      const url = `https://www.instagram.com/horusfaculdadespzo/`;
      window.open(url, '_blank');
    },

    redirectWhatsapp() {
      const phoneNumber = '5549988685923';
      const message = 'Olá, gostaria de mais informações sobre a Horus Faculdades!'; // A mensagem predefinida
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank');
    }
  },
};
</script>
