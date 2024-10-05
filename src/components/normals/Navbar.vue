<template>
  <div class="bg-oil">
    <div class="grid grid-cols-12 p-4">
      <div class="col-span-6 sm:col-span-2 lg:flex items-center justify-center cursor-pointer">
        <img src="@/assets/images/orange-logo.png" width="100" height="10" class="!p-0" @click="goHome" />
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
                  <span class="text-sm tracking-wide" style="color:black !important;">{{ menu.title }}</span>
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

                  <v-list-item
                    class="hover:bg-gray-200"
                    v-for="(othersMenu, y) in submenu.menus"
                    :key="y"
                    :title="othersMenu.title"
                    :href="`${baseUrl}/${othersMenu.url}`"
                  />
                </v-list-group>

                <v-list-item v-if="submenu.linkExtern == true" class="hover:bg-gray-200" density="compact" >
                  <a :href="`${baseUrl}/${submenu.url}`" target="_blank">
                    {{ submenu.title }}
                  </a>
                </v-list-item>

                <v-list-item
                  v-if="(!submenu.menus || !submenu.menus.length) && !submenu.linkExtern"
                  class="hover:bg-gray-200"
                  density="compact"
                  :href="`${baseUrl}/${submenu.url}`"
                  :title="submenu.title"
                />
              </v-list>
            </v-list-group>
          </v-list>
        </v-menu>
      </div>

      <div class="hidden sm:block col-span-10">
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
                color="primary"
                v-bind="props"
                class="w-full"
                append-icon="mdi-menu-down"
              >
                <span class="text-xs xl:text-sm tracking-wide text-gray-200">{{ menu.title }}</span>
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

                <v-list-item
                  class="hover:bg-gray-200"
                  v-for="(othersMenu, y) in submenu.menus"
                  :key="y"
                  :title="othersMenu.title"
                  :href="`${baseUrl}/${othersMenu.url}`"
                />
              </v-list-group>

              <v-list-item v-if="submenu.linkExtern == true" class="hover:bg-gray-200" density="compact" >
                <a :href="`${baseUrl}/${submenu.url}`" target="_blank">
                  {{ submenu.title }}
                </a>
              </v-list-item>

              <v-list-item
                v-if="(!submenu.menus || !submenu.menus.length) && !submenu.linkExtern"
                class="hover:bg-gray-200"
                density="compact"
                :href="`${baseUrl}/${submenu.url}`"
                :title="submenu.title"
              />
            </v-list>
          </v-menu>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
  export default {
    name: 'navbar-commponent',

    data: () => ({
      baseUrl: '',
      menus: [
        {
          title: 'Cursos',
          submenus: [
            {
              title: 'Graduação',
              menus: []
            },
            {
              title: 'Pós Graduação',
              menus: [
                { title: 'Gestão de Cooperativas', url: 'other' },
                { title: 'Gestão Estratégica de Varejo', url: 'other' },
                { title: 'Controladoria Auditoria e Finanças', url: 'other' },
                { title: 'Gestão de Pessoas', url: 'other' },
                { title: 'Neuropsicopedagogia', url: 'other' },
                { title: 'Anos Iniciais e Educação Infantil', url: 'other' },
              ]
            },
            {
              title: 'Extensão',
              menus: [
                { title: 'Modelagem 3D com Sketchup', url: 'other' },
              ]
            },
          ]
        },
        {
          title: 'Seletivo 2025',
          url: 'other'
        },
        {
          title: 'Institucional',
          submenus: [
            {
              title: 'Instituição',
              menus: [
                { title: 'Conheça a Horus', url: 'conheca-a-horus' },
                { title: 'Instituto Horus', url: 'instituto-horus' },
                { title: 'Ouvidoria', url: 'other' },
                { title: 'Laboratórios', url: 'other' },
                { title: 'CPA', url: 'other' },
              ]
            },
            {
              title: 'Acadêmico',
              menus: [
                { title: 'Academico Horus', url: 'other' },
                { title: 'Bolsas de Estudo', url: 'other' },
                { title: 'Biblioteca', url: 'other' },
                { title: 'Balcão de Empregos', url: 'other' },
                { title: 'Bolsas de Estudo', url: 'other' },
                { title: 'Periódicos', url: 'other' },
                { title: 'Revista Alvorada', url: 'other' },
                { title: 'SAE', url: 'other' },
              ]
            },
            {
              title: 'Artigos',
              menus: []
            },
            {
              title: 'Notícias',
              url: 'noticias'
            },
          ]
        },
        {
          title: 'Plataformas',
          submenus: [
            { title: 'Unimestre', url: 'http://187.45.101.41:8080/projetos/nucleo/uteis/login.php?&tid=0&lid=0&pid=24&arq_ret=R5QT1WSRQBMCVQVPFFQSF99MCT5RT44Q9WRW0RBM0FMM5QQ4', linkExtern: true },
            { title: 'Plataforma Horus', url: 'https://horus.grupoa.education/plataforma/auth/signin?returnUrl=%2F', linkExtern: true },
          ],
        },
        {
          title: 'Consulta de Diplomas',
          submenus: [
            { title: 'Consulta Public', url: 'http://unimestre.horus.edu.br:8080/gestao/public/consulta-publica/diploma', linkExtern: true },
            { title: 'Consulta Histórico', url: 'http://unimestre.horus.edu.br:8080/gestao/public/consulta-publica/historico', linkExtern: true },
          ],
        },
      ],
    }),

    methods: {
      async getCourses() {
        await this.$http.get('/courses/get-all-courses').then(resp => {
          if (resp.type !== 'success') {
            return
          }
          this.setArticlesMenu(resp.body)

          this.setGraduationsMenu(resp.body)
        });
      },

      setArticlesMenu(body) {
        const articles = body.map(a => {
          return {
            title: a.name,
            url: `noticias/${a.id}`
          }
        })

        this.menus.find(a => a.title == 'Institucional').submenus.find(b => b.title == 'Artigos').menus = articles
      },

      setGraduationsMenu(data) {
        const graduations = data.filter(a => a.type == 'Graduação').map(a => {
          return {
            title: a.name,
            url: `graduacao/${a.id}`
          }
        })

        this.menus.find(a => a.title == 'Cursos').submenus.find(c => c.title == 'Graduação').menus = graduations
      },

      goHome() {
        this.$router.push('/')
      }
    },

    async mounted() {
      this.baseUrl = `${window.location.protocol}//${window.location.hostname}:5173`
      await this.getCourses()
    }
  }
</script>
