<template>
  <x-body-content>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <v-btn v-for="(course, i) in courses" :key="i" color="black" @click="getNoticeByCourse(course)">
        <span class="text-white">{{ course.name }}</span>
      </v-btn>
    </div>

    <div class="mt-10 mb-12">
      <div v-for="notice in paginatedNotices" :key="notice.id" class="mb-2 hover:bg-gray-200 cursor-pointer">
        <div class="pl-8 pt-2 flex items-center" @click="selectNotice(notice)">
          <img :src="notice.image_url" class="mb-2" :width="100" :height="100" contain style="border-radius: 5px;;"/>
          <div>
            <div class="ml-4 font-bold">{{ notice.name }}</div>
            <div class="ml-4">{{ notice.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <v-pagination color="red" v-model="page" :length="totalPages" class="my-1 dark"></v-pagination>
  </x-body-content>
</template>

<script>
export default {
  data: () => ({
    notices: [],
    courses: [],
    page: 1,
    itemsPerPage: 5,
  }),

  computed: {
    totalPages() {
      return Math.ceil(this.notices.length / this.itemsPerPage);
    },

    paginatedNotices() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.notices.slice(start, end);
    },
  },

  methods: {
    getNoticeByCourse(course) {
      this.getNotices(course.id);
      this.page = 1;
    },

    async getNotices(courseId) {
      const uri = courseId ? `?course=${courseId}` : '';

      await this.$http.get(`/notices/get-all-notices${uri}`).then(resp => {
        this.notices = resp.body.map(notice => ({
          id: notice.id,
          title: notice.title,
          image_url: notice.image_url,
          name: notice.name,
        }));
        this.page = 1;
      });
    },

    selectNotice(notice) {
      this.$router.push(`noticia/${notice.id}`);
    },

    async getCourses() {
      await this.$http.get(`/courses/get-all-courses`).then(resp => {
        this.courses = resp.body;
        this.courses.push({
          id: null,
          name: 'Todos'
        });
      });
    },
  },

  mounted() {
    this.getNotices(this.$route.params.id);
    this.getCourses();
  },
};
</script>
