<template>
  <v-carousel class="bg-black p-10">
    <v-carousel-item>
      <div class="flex justify-between items-center space-x-4 mx-20">
        <div v-for="(item, index) in items" :key="index" class="w-[350px] h-[500px]">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full">
            <img :src="item.image" alt="Image" class="w-full h-1/2 object-cover">
            <div class="p-6 h-1/2">
              <h3 class="text-sm font-semibold truncate">{{ item.title }}</h3>
              <p class="text-gray-500 text-xs">{{ item.date }}</p>
              <p class="text-gray-700 text-xs mt-1 truncate">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          image: 'https://static.wixstatic.com/media/d2be83_b605b78313ce44fa9b076bd3cecd0049~mv2.png/v1/crop/x_41,y_0,w_2841,h_1772/fill/w_1029,h_642,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/_Not%C3%ADcias%20%20.png',
          title: 'EDF : Workshop sobre ciclismo',
          date: '17 de abril de 2023',
          description: 'Na noite de ontem, dia 01/04, a turma da 1ª fase de Educação Física...'
        },
        {
          image: 'https://static.wixstatic.com/media/d2be83_b605b78313ce44fa9b076bd3cecd0049~mv2.png/v1/crop/x_41,y_0,w_2841,h_1772/fill/w_1029,h_642,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/_Not%C3%ADcias%20%20.png',
          title: 'Alunos do curso de Pedagogia exploram a Trilha do Saber',
          date: '17 de abril de 2023',
          description: 'Na noite de ontem, dia 01/04, a turma da 1ª fase de Educação Física...'
        },
        {
          image: 'https://static.wixstatic.com/media/d2be83_b605b78313ce44fa9b076bd3cecd0049~mv2.png/v1/crop/x_41,y_0,w_2841,h_1772/fill/w_1029,h_642,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/_Not%C3%ADcias%20%20.png',
          title: '28ª Maratona de Programação',
          date: '17 de abril de 2023',
          description: 'Neste final de semana, a Horus Faculdades representada pelo Professor...'
        },
        {
          image: 'https://static.wixstatic.com/media/d2be83_b605b78313ce44fa9b076bd3cecd0049~mv2.png/v1/crop/x_41,y_0,w_2841,h_1772/fill/w_1029,h_642,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/_Not%C3%ADcias%20%20.png',
          title: '28ª Maratona de Programação',
          date: '17 de abril de 2023',
          description: 'Neste final de semana, a Horus Faculdades representada pelo Professor...'
        }
      ]
    }),
  }
</script>
