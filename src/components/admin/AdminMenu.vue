<template>
  <v-card class="mx-auto" width="350" height="100vh" tile>
    <div>
      <div class="bg-oil text-white h-20 flex p-4 items-center border-r-2">
        <img src="@/assets/images/logo.png" width="60" height="10" class="!p-0" />
      </div>
    </div>

    <v-list>
      <v-list-subheader>CONFIGURAÇÕES</v-list-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        :to="item.url"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'admin-menu-component',

    data: () => ({
      items: [
        { title: 'Docentes', icon: 'mdi-account-multiple', url: '/admin-config/persons' },
        { title: 'Cursos', icon: 'mdi-book-account', url: '/admin-config/courses' },
        { title: 'Noticias', icon: 'mdi-bulletin-board', url: '/admin-config/notices' },
      ],
    }),

    methods: {
      async getSeals() {

      },
    },

    async mounted() {
      await this.getSeals();
    },
  }
</script>
