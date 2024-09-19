<template>
  <div class="bg-black p-12">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="seal in seals" :key="seal" class="flex justify-center items-center">
        <img :src="seal" class="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'seals-component',

    data: () => ({
      seals: [],
    }),

    methods: {
      async getSeals() {
        try {
          const response = await this.$http.get('/institution/get-all-seals');
          this.seals = response.body
        } catch (error) {
          return [];
        }
      },
    },

    async mounted() {
      await this.getSeals();
    },
  }
</script>
