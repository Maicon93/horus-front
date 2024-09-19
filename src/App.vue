<template>
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
    }
  },
};
</script>