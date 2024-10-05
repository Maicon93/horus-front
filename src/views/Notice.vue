<template>
  <div class="bg-oil flex flex-col items-center" style="min-height: calc(100vh - 8rem)">
    <div class="p-2 text-white text-justify w-full md:w-5/6 lg:w-5/6 xl:w-2/3">
      <v-card class="flex justify-center">
        <div v-if="notice" class="py-5 px-10">
          <p class="text-lg font-bold">{{ notice.title }}</p>
          <p class="text-sm text-gray-500">{{ notice.created_date }}</p>

          <p class="py-5" v-html="notice.text"></p>

          <div class="text-center flex justify-center pt-10">
            <img class="w-full md:w-5/6 lg:w-2/3 flex justify-center" :src="notice.image_url" />
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    notice: null
  }),

  methods: {
    async getNotice() {
      await this.$http.get(`/notices/get-notice/${this.$route.params.id}`).then(resp => {
          if (resp.body.length) {
            this.notice = resp.body[0]
            this.notice.text = this.notice.text.replace(/\n/g, '<br>')
          }
      })
    }
  },

  mounted() {
    this.getNotice()
  }
};
</script>

