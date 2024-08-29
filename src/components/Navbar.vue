<template>
  <div class="bg-black h-50">
    <div class="grid grid-cols-12 p-4">
      <div class="block sm:hidden col-span-6 sm:col-span-2 lg:flex items-center justify-center">
        <img src="@/assets/images/logo.png" width="100" height="10" class="!p-0" />
      </div>

      <div class="block sm:hidden col-span-6 flex justify-end items-center">
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              color="white"
              icon="mdi-menu"
              size="x-large"
            ></v-icon>
          </template>

          <v-list tile>
            <v-list-group v-for="(menu, i) in menus" :key="i" transition="scale-transition">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="white"
                  v-bind="props"
                  class="w-full hover:bg-gray-200"
                  prepend-icon="mdi-menu-down"
                >
                  <span class="text-sm tracking-wide">{{ menu.title }}</span>
                </v-btn>
              </template>

              <v-list v-for="(submenu, x) in menu.submenus" :key="x" tile>
                <v-list-group v-if="submenu.menus && submenu.menus.length" :value="submenu.menus">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      :title="submenu.title"
                    ></v-list-item>
                  </template>

                  <v-list-item class="hover:bg-gray-200" v-for="(othersMenu, y) in submenu.menus" :key="y" :title="othersMenu.title"></v-list-item>
                </v-list-group>

                <v-list-item class="hover:bg-gray-200"  v-else density="compact" :title="submenu.title"></v-list-item>
              </v-list>
            </v-list-group>
          </v-list>
        </v-menu>

      </div>

      <div class="hidden sm:block col-span-11 md:col-span-10 lg:col-span-8">
        <v-text-field
          label="Pesquisa personalizada"
          bg-color="white"
          density="compact"
          class="w-full"
        />

        <div class="grid grid-cols-3 md:grid-cols-5 gap-2">
          <v-menu v-for="(menu, i) in menus" :key="i" transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn
                color="white"
                v-bind="props"
                class="w-full"
                append-icon="mdi-menu-down"
              >
                <span class="text-xs xl:text-sm tracking-wide">{{ menu.title }}</span>
              </v-btn>
            </template>

            <v-list v-for="(submenu, x) in menu.submenus" :key="x" tile>
              <v-list-group v-if="submenu.menus && submenu.menus.length" :value="submenu.menus">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :title="submenu.title"
                  ></v-list-item>
                </template>

                <v-list-item class="hover:bg-gray-200" v-for="(othersMenu, y) in submenu.menus" :key="y" :title="othersMenu.title"></v-list-item>
              </v-list-group>

              <v-list-item class="hover:bg-gray-200" v-else density="compact" :title="submenu.title"></v-list-item>
            </v-list>
          </v-menu>
        </div>

      </div>

      <div class="hidden sm:block col-span-1 md:col-span-2 lg:flex justify-center gap-2 px-4">
        <v-icon
          color="white"
          icon="mdi-whatsapp"
          size="x-large"
        ></v-icon>
        <v-icon
          color="white"
          icon="mdi-instagram"
          size="x-large"
        ></v-icon>
        <v-icon
          color="white"
          icon="mdi-facebook"
          size="x-large"
        ></v-icon>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'navbar-commponent',

    data: () => ({
      menus: [
        {
          title: 'Cursos',
          submenus: [
            {
              title: 'Graduação',
              menus: [
                { title: 'Administração'},
                { title: 'Ciências Contábeis'},
                { title: 'Direito'},
                { title: 'Educação Física Bacharelado'},
                { title: 'Educação Física Licenciatura'},
                { title: 'Engenharia Civil'},
                { title: 'Pedagogia'},
                { title: 'Sistemas de Informação'},
              ]
            },
            {
              title: 'Pós Graduação',
              menus: [
                { title: 'Gestão de Cooperativas', url: '' },
                { title: 'Gestão Estratégica de Varejo', url: '' },
                { title: 'Controladoria Auditoria e Finanças', url: '' },
                { title: 'Gestão de Pessoas', url: '' },
                { title: 'Neuropsicopedagogia', url: '' },
                { title: 'Anos Iniciais e Educação Infantil', url: '' },
              ]
            },
            {
              title: 'Extensão',
              menus: [
                { title: 'Modelagem 3D com Sketchup', url: '' },
              ]
            },
          ]
        },
        {
          title: 'Seletivo 2024',
          url: ''
        },
        {
          title: 'Artigos',
          submenus: [
            { title: 'Administração', url: '' },
            { title: 'Sistemas de Informação', url: '' },
            { title: 'Direito', url: '' },
            { title: 'Ciências Contábeis', url: '' },
            { title: 'Pedagogia', url: '' },
            { title: 'Educação Física', url: '' },
            { title: 'Dança', url: '' },
            { title: 'Engenharia Civil', url: '' },
          ]
        },
        {
          title: 'Institucional',
          submenus: [
            {
              title: 'Instituição',
              menus: [
                { title: 'Conheça a Horus', url: '' },
                { title: 'Instituto Horus', url: '' },
                { title: 'Ouvidoria', url: '' },
                { title: 'Laboratórios', url: '' },
                { title: 'Notícias', url: '' },
                { title: 'CPA', url: '' },
              ]
            },
            {
              title: 'Acadêmico',
              menus: [
                { title: 'Academico Horus', url: '' },
                { title: 'Bolsas de Estudo', url: '' },
                { title: 'Biblioteca', url: '' },
                { title: 'Balcão de Empregos', url: '' },
                { title: 'Bolsas de Estudo', url: '' },
                { title: 'Periódicos', url: '' },
                { title: 'Revista Alvorada', url: '' },
                { title: 'SAE', url: '' },
              ]
            },
          ]
        },
        {
          title: 'Plataformas',
          submenus: [
            { title: 'Unimestre', url: '' },
            { title: 'Plataforma Horus', url: '' },
          ]
        },
      ],
    }),
  }
</script>
