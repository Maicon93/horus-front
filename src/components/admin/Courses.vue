<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <div class="col-span-1" size="small">
      <v-btn size="small" color="black" @click="openDialog('new')">
        <span class="text-white">Adicionar Curso</span>
      </v-btn>
    </div>

    <div class="col-span-2"></div>

    <v-data-table :items="courses" :headers="headers">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="openDialog('edit', item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deleteCourse(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-toolbar class="bg-black" dense flat>
          <div class="p-2 text-white text-2xl">{{ dialogMode === 'edit' ? 'Editar Curso' : 'Adicionar Curso' }}</div>
        </v-toolbar>

        <div class="p-4">

          <v-select
            v-model="editedCourse.id_coordinator"
            :items="persons"
            item-title="name"
            item-value="id"
            variant="outlined"
            label="Coordenador"
          />

          <v-text-field v-model="editedCourse.name" label="Nome do Curso" variant="outlined" />
        </div>

        <div class="flex p-4 justify-space-between">
          <v-btn class="bg-black" @click="closeDialog"><span>Cancelar</span></v-btn>
          <v-btn class="bg-success" @click="saveCourse"><span>Salvar</span></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  inject: ['$confirm'],
  data: () => ({
    courses: [],
    persons: [],
    dialog: false,
    dialogMode: 'new',
    editedCourse: {
      name: '',
      name_coordinator: '',
    },
    defaultCourse: {
      name: '',
      name_coordinator: '',
    },
    selectedCourse: null,
    headers: [
      { title: 'Descrição', key: 'name' },
      { title: 'Coordenador', key: 'name_coordinator' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],
  }),

  methods: {
    async saveCourse() {
      await this.$http.put(`/institution/create-or-update-course`, this.editedCourse).then((resp) => {
        window.location.reload()
      });
    },

    async deleteCourse(item) {
      if (!await this.$confirm('Deseja realmente remover este curso?')) {
        return
      }

      await this.$http.delete(`/institution/delete-course/${item.id}`).then(() => {
          const index = this.courses.findIndex(course => course.id === item.id)

          index !== -1 && this.courses.splice(index, 1)
      });
    },

    openDialog(mode, course = null) {
      if (mode !== 'edit' || course) {
        this.dialogMode = mode;
        this.defaultCourse = course;

        this.editedCourse = Object.assign({}, this.defaultCourse);
        return this.dialog = true;
      }

      return this.editedCourse = Object.assign({}, course);
    },

    closeDialog() {
      this.dialog = false;
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
  },

  async mounted() {
    await this.getPersons();
    await this.getCourses();
  },
};
</script>
