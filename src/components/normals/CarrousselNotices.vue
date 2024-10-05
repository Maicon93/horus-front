<template>
  <v-carousel hide-delimiters v-if="pages.length > 0" class="bg-oil p-10 lg:p-28 xl:px-38">
    <v-carousel-item v-for="(page, pageIndex) in pages" :key="pageIndex">
      <div class="flex justify-around items-center space-x-4">
        <div v-for="(item, index) in page" :key="index" class="w-[350px] h-[390px] pb-5">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full" @click="openNotice(item)">
            <img :src="item.image_url" alt="Image" class="w-full h-2/5 object-cover">
            <div class="m-2 h-3/5 flex flex-col">
              <h3 class="text-sm font-semibold">{{ item.title }}</h3>
              <p class="text-gray-500 text-xs">{{ item.created_date }}</p>
              <p class="pt-4 text-gray-700 text-xs mt-1 flex-grow overflow-auto">{{ item.preview }}</p>
              <div class="flex justify-center p-4">
                <v-btn density="compact" rounded color="black">
                  <span class="text-xs tracking-wide text-white">Ver mais</span>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data: () => ({
      pages: [],
    }),

    methods: {
      openNotice(item) {
        this.$router.push(`/noticia/${item.id}`);
      },

      async getNotices() {
        try {
          const response = await this.$http.get('/notices/get-notices-highlighted');
          return response.body;
        } catch (error) {
          return [];
        }
      },

      async getPages() {
        const sizeWidth = this.$calculateSizeWidth()
        let itemsPerPage = 3

        const notices = await this.getNotices();
        ['xxs', 'xs', 'sm', 'md'].includes(sizeWidth) && (itemsPerPage = 1);
        sizeWidth === 'lg' && (itemsPerPage = 2);

        const pages = [];
        for (let i = 0; i < notices.length; i += itemsPerPage) {
          pages.push(notices.slice(i, i + itemsPerPage))
        }

        return pages
      },
    },

    async mounted() {
      this.pages = await this.getPages()
    },
  }
</script>
