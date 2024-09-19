<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <div class="col-span-1" size="small">
      <v-btn size="small" color="black" @click="openDialog('new')">
        <span class="text-white">Adicionar Pessoa</span>
      </v-btn>
    </div>

    <div class="col-span-2"></div>

    <v-data-table :items="persons" :headers="headers">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="openDialog('edit', item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deletePerson(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-toolbar class="bg-black" dense flat>
          <div class="p-2 text-white text-2xl">{{ dialogMode === 'edit' ? 'Editar Pessoa' : 'Adicionar Pessoa' }}</div>
        </v-toolbar>

        <div class="p-4">
          <v-text-field v-model="editedPerson.name" label="Nome da Pessoa" variant="outlined" />
          <v-text-field v-model="editedPerson.email" label="Email da Pessoa" variant="outlined" />
        </div>

        <div class="flex p-4 justify-space-between">
          <v-btn class="bg-black" @click="closeDialog"><span>Cancelar</span></v-btn>
          <v-btn class="bg-success" @click="savePerson"><span>Salvar</span></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  inject: ['$confirm'],
  data: () => ({
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
      await this.$http.put(`/institution/create-or-update-person`, this.editedPerson).then(() => {
        window.location.reload();
      });
    },

    async deletePerson(item) {
      if (!await this.$confirm('Deseja realmente remover esta pessoa?')) {
        return;
      }

      await this.$http.delete(`/institution/delete-person/${item.id}`).then(() => {
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
      await this.$http.get('/institution/get-all-persons').then(resp => {
        this.persons = resp.body;
      });
    },
  },

  async mounted() {
    await this.getPersons();
  },
};
</script>
