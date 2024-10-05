<template>
  <div class="grid grid-cols-3 gap-4 p-4">
    <div class="col-span-1" size="small">
      <v-btn size="small" color="black" @click="addNewNotice">
        <span class="text-white">Adicionar Notícia</span>
      </v-btn>
    </div>

    <div class="col-span-2"></div>

    <div class="col-span-1 bg-gray-100 p-4">
      <div v-for="(notices, course) in noticesGroupedByCourse" :key="course" class="mb-6">
        <h3 class="font-bold text-lg mb-2">{{ course }}</h3>
          <div v-for="notice in notices" :key="notice.id" class="mb-2">
            <li @click="selectNotice(notice)" class="hover:bg-gray-200 cursor-pointer">
              {{ notice.title }}
            </li>
          </div>
      </div>
    </div>

    <div class="col-span-2 bg-white p-4">
      <h2 class="font-bold mb-4">Informações da notícia</h2>
      <div v-if="selectedNotice">
        <v-select
          v-model="selectedNotice.id_course"
          :items="courses"
          item-title="name"
          item-value="id"
          variant="outlined"
          label="Curso"
        />

        <v-text-field class="pb-2" v-model="selectedNotice.title" label="Titulo" variant="outlined" density="compact" />
        <v-textarea class="pb-2" v-model="selectedNotice.preview" label="Preview" variant="outlined" density="compact" />
        <v-textarea class="pb-2" v-model="selectedNotice.text" label="Texto Completo" variant="outlined" density="compact" />

        <v-file-input
          v-if="selectedNotice.newImage"
          v-model="selectedNotice.newImage"
          label="Imagem"
          variant="outlined"
          show-size
        />

        <v-btn v-else color="#00051a" @click="updateImage(selectedNotice)">
          <label class="text-white">Alterar Imagem</label>
        </v-btn>

        <v-switch v-model="selectedNotice.highlighted" color="success" label="Destacar na página principal" />

        <div class="flex gap-2">
          <v-btn class="btn-black" size="small" color="black" @click="deleteNotice(selectedNotice)">Deletar</v-btn>
          <v-btn class="btn-black" size="small" color="success" @click="saveNotice(selectedNotice)">Salvar</v-btn>
        </div>
      </div>

      <p v-else>Selecione uma notícia para ver mais detalhes.</p>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$confirm'],
  data: () => ({
    courses: [],
    selectedNotice: null,
    noticesGroupedByCourse: [],
  }),


  methods: {
    async saveNotice(notice) {
      const formData = new FormData();

      let nameImage = ''
      if (!!notice.newImage) {
        nameImage = `${notice.id_course}-${Math.round(Math.random() * 1E9)}-${notice.newImage[0].name}`
      }

      notice.id && formData.append('id', notice.id)
      formData.append('title', notice.title)
      formData.append('text', notice.text)
      formData.append('preview', notice.preview)
      formData.append('highlighted', notice.highlighted)
      formData.append('id_course', notice.id_course)
      formData.append('imageName', nameImage)
      formData.append('old_image_name', notice.old_image_name)

      if (notice.newImage && notice.newImage.length > 0) {
        formData.append('image', notice.newImage[0]);
      }

      await this.$http.post('/notices/save-notice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => window.location.reload())
    },

    async getCourses() {
      await this.$http.get('/courses/get-all-courses').then(resp => {
        this.courses = resp.body
      });
    },

    async deleteNotice(notice) {
      if (!await this.$confirm('Deseja realmente remover essa notícia?')) {
        return
      }

      await this.$http.delete(`/notices/delete-notice/${notice.id}`).then(resp => {
        window.location.reload()
      });
    },

    async getNotices() {
      await this.$http.get('/notices/get-all-notices').then(resp => {
        const noticesGroupedByCourse = resp.body.reduce((acc, notice) => {
          const courseName = notice.name;
          if (!acc[courseName]) {
            acc[courseName] = [];
          }
          acc[courseName].push(notice);
          return acc;
        }, {});

        this.noticesGroupedByCourse = noticesGroupedByCourse;
      });
    },

    updateImage(notice) {
      notice.newImage = []
    },

    addNewNotice() {
      this.selectedNotice = {
        highlighted: false,
        id_course: null,
        preview: "",
        text: "",
        title: "",
        newImage: []
      }
    },

    selectNotice(notice) {
      this.selectedNotice = notice;
    },
  },

  async mounted() {
    await this.getCourses();
    await this.getNotices();
  },
};
</script>