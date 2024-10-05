<template>
  <div class="flex bg-oil">
    <div class="hidden lg:block">
      <AdminMenu />
    </div>

    <div class="px-2 w-full">
      <div class="bg-oil text-white h-20 flex items-center justify-space-between">
        <div class="m-4 block lg:hidden">
          <v-icon color="white">mdi-menu</v-icon>
        </div>
        <div class="pr-4 w-full flex justify-end">
          <v-icon color="white" @click="logout">mdi-logout</v-icon>
        </div>
      </div>

      <v-card class="w-full" height="calc(100vh - 5rem)" tile>
        <RouterView name="admin"/>
      </v-card>
    </div>
  </div>
</template>

<script>
import AdminMenu from '@/components/admin/AdminMenu.vue';

export default {
  components: { AdminMenu },

  methods: {
    logout() {
      localStorage.removeItem('sessionHash')
      this.$router.push('/');
    }
  }
};
</script>