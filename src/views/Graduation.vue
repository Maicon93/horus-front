<template>
  <x-body-content>
    <div class="p-6  text-white">
      <section class="mb-4 text-center text-4xl md:text-5xl font-bold drop-shadow-lg bg-gradient-to-r from-red-500 to-orange-500 border-lg">
        {{ course.name }}
      </section>

      <p class="p-5 text-lg leading-relaxed drop-shadow-lg" v-html="course.description"></p>

      <section class="grid mt-12 grid-cols-1 md:grid-cols-2 gap-6">
        <div class="grid-cols-2 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-gray-800">
          <div class="mb-4 text-center text-3xl font-bold drop-shadow-lg bg-gradient-to-r from-red-500 to-orange-500 border-lg">
            Área de Atuação
          </div>
          <p class="py-5 text-lg leading-relaxed" v-html="course.actuation_area"></p>
        </div>

        <div class="grid-cols-2 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-gray-800">
          <div class="mb-4 text-center text-3xl font-bold drop-shadow-lg bg-gradient-to-r from-red-500 to-orange-500 border-lg">
            Professores
          </div>
          <ul class="list-disc list-inside text-lg leading-relaxed">
            <li v-for="(teacher, index) in course.teachers" :key="index" class="mb-2">
              {{ teacher }}
            </li>
          </ul>
        </div>
      </section>

      <div class="w-full mt-5 flex justify-center">
        <div class="relative w-full md:w-2/3 lg:w-1/2">
          <img src="@/assets/images/bg-graduation.webp" class="w-full h-72 rounded-lg" />
          <div class="absolute inset-0 flex flex-col items-center my-1 p-2">
            <div class="
              p-2
              text-white
              text-center
              text-2xl
              drop-shadow-lg
              bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300
              w-full
              rounded-lg"
            >
              Tipo do Curso
            </div>
            <div class="flex pt-3 items-center justify-center">
              <img src="@/assets/images/seals/graduation.png" class="w-48"/>
              <div>
                <span class="text-white text-2xl block">{{ course.type }}</span>
                <span class="text-white text-2xl block mt-4 mb-2">{{ course.duration }} anos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </x-body-content>
</template>

<script>
export default {
  data: () => ({
    course: {}
  }),

  methods: {
    async getCourses() {
      try {
        await this.$http.get(`/institution/get-course/${this.$route.params.id}`).then(resp => {
          if (resp.body.length) {
            this.course = resp.body[0];
            this.course.duration = (+this.course.duration).toFixed(1)
            this.course.description = this.course.description.replace(/\n/g, '<br>')
            this.course.actuation_area = this.course.actuation_area.replace(/\n/g, '<br>')
          }
        });
      } catch (error) {
        console.log('Erro ao buscar o curso:', error);
      }
    }
  },

  async mounted() {
    await this.getCourses();
  }
};
</script>

<style scoped>
/* Animação suave ao passar o mouse */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.drop-shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
