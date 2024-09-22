<template>
  <div class="h-screen overflow-hidden">
    <div class="grid grid-cols-3 gap-4 h-full">
      <!-- Coluna lateral com a lista de cursos -->
      <div class="col-span-1 bg-gray-100 p-4 overflow-y-auto">
        <v-btn size="small" color="black" class="mb-4" @click="addNewCourse">
          <span class="text-white">Adicionar Curso</span>
        </v-btn>
        <div v-for="course in courses" :key="course.id" class="mb-6">
          <li @click="selectCourse(course)" class="hover:bg-gray-200 cursor-pointer">
            {{ course.name }}
          </li>
        </div>
      </div>

      <!-- Coluna principal com as informações do curso -->
      <div class="col-span-2 bg-white p-4 py-12 overflow-y-auto">
        <h2 class="font-bold mb-4">Informações do curso</h2>

        <div v-if="selectedCourse" class="py-12">
          <v-select
            v-model="selectedCourse.id_coordinator"
            :items="persons"
            item-title="name"
            item-value="id"
            variant="outlined"
            label="Coordenador"
            density="compact"
          />

          <v-text-field
            class="pb-2"
            v-model="selectedCourse.name"
            label="Nome do Curso"
            variant="outlined"
            density="compact"
          />

          <v-textarea
            class="pb-2"
            v-model="selectedCourse.description"
            label="Descrição"
            variant="outlined"
            density="compact"
          />

          <v-textarea
            class="pb-2"
            v-model="selectedCourse.actuation_area"
            label="Área de Atuação"
            variant="outlined"
            density="compact"
          />

          <v-select
            v-model="selectedCourse.type"
            :items="courseTypes"
            label="Tipo de Curso"
            variant="outlined"
            density="compact"
          />

          <v-text-field
            class="pb-2"
            type="number"
            v-model="selectedCourse.duration"
            label="Duração em anos"
            variant="outlined"
            density="compact"
          />

          <h3 class="mt-4 mb-2 font-bold">Professores</h3>

          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            density="compact"
            class="mx-8"
          ></v-text-field>

          <v-data-table
            v-model="selectedTeachers"
            :items="persons"
            :headers="headers"
            show-select
            :search="search"
            density="compact"
            :items-per-page="5"
          />

          <div class="flex gap-2 mt-4">
            <v-btn class="btn-black" size="small" color="black" @click="deleteCourse(selectedCourse)">Deletar</v-btn>
            <v-btn class="btn-black" size="small" color="success" @click="saveCourse(selectedCourse)">Salvar</v-btn>
          </div>
        </div>

        <p v-else>Selecione um curso para ver mais detalhes ou crie um novo curso.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$confirm'],

  data: () => ({
    persons: [],
    courses: [],
    selectedCourse: null,
    selectedTeachers: [],
    courseTypes: ['Graduação', 'Pós-Graduação', 'Técnico', 'Licenciatura', 'Outros'],
    search: '',
    headers: [
      { title: "Nome", key: "name" },
    ]
  }),

  methods: {
    async saveCourse(course) {
      course.teachers = this.selectedTeachers

      await this.$http.put('/institution/create-or-update-course', course).then(() => {
        window.location.reload()
      });
    },

    async getCourses() {
      await this.$http.get('/institution/get-all-courses').then(resp => {
        this.courses = resp.body;
      });
    },

    async getPersons() {
      await this.$http.get('/institution/get-all-persons').then(resp => {
        this.persons = resp.body;
      });
    },

    async deleteCourse(course) {
      if (!await this.$confirm('Deseja realmente remover este curso?')) {
        return;
      }

      await this.$http.delete(`/institution/delete-course/${course.id}`).then(resp => {
        window.location.reload();
      });
    },

    addNewCourse() {
      this.selectedCourse = {
        id_coordinator: null,
        name: "",
        description: "",
        actuation_area: "",
      };

      this.selectedTeachers = []
    },

    async selectCourse(course) {
      this.selectedTeachers = []
      this.selectedCourse = { ...course || [] };

      await this.$http.get(`/institution/get-teachers-by-course/${course.id}`).then(resp => {
        this.selectedTeachers = resp.body.map(a => a.id)
      });

    },
  },

  async mounted() {
    await this.getPersons();
    await this.getCourses();
  }
};
</script>
