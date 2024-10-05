<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <div class="col-span-1 flex items-center gap-2" size="small">
      <v-btn size="small" color="primary" @click="openDialog('new')">Adicionar Docentes</v-btn>
      <v-text-field
        v-model="search"
        label="Nome"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>

    <div class="col-span-2"></div>


    <v-data-table :items="persons" :headers="headers" :search="search">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="openDialog('edit', item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deletePerson(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-toolbar color="secondary" dense flat>
          <div class="p-2 text-white text-2xl">{{ dialogMode === 'edit' ? 'Editar Docente' : 'Adicionar Docente' }}</div>
        </v-toolbar>

        <div class="p-4">
          <v-text-field v-model="editedPerson.name" label="Nome" variant="outlined" />
          <v-text-field v-model="editedPerson.email" label="Email" variant="outlined" />
        </div>

        <div class="flex p-4 justify-space-between">
          <v-btn color="oil" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="success" @click="savePerson"><span>Salvar</span></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  inject: ['$confirm'],
  data: () => ({
    search: '',
    persons: [],
    dialog: false,
    dialogMode: 'new',
    editedPerson: {
      name: '',
      email: '',
    },
    defaultPerson: {
      name: '',
      email: '',
    },
    selectedPerson: null,
    headers: [
      { title: 'Nome', key: 'name' },
      { title: 'Email', key: 'email' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],
  }),

  methods: {
    async savePerson() {
      await this.$http.put(`/persons/create-or-update-person`, this.editedPerson).then(() => {
        window.location.reload();
      });
    },

    async deletePerson(item) {
      if (!await this.$confirm('Deseja realmente remover esta pessoa?')) {
        return;
      }

      await this.$http.delete(`/persons/delete-person/${item.id}`).then(() => {
        const index = this.persons.findIndex(person => person.id === item.id);

        index !== -1 && this.persons.splice(index, 1);
      });
    },

    openDialog(mode, person = null) {
      if (mode !== 'edit' || person) {
        this.dialogMode = mode;
        this.defaultPerson = person;

        this.editedPerson = Object.assign({}, this.defaultPerson);
        return this.dialog = true;
      }

      return this.editedPerson = Object.assign({}, person);
    },

    closeDialog() {
      this.dialog = false;
    },

    async getPersons() {
      await this.$http.get('/persons/get-all-persons').then(resp => {
        this.persons = resp.body;
      });
    },
  },

  async mounted() {
    await this.getPersons();
  },
};
</script>
