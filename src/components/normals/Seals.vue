<template>
  <div class="bg-oil w-full flex justify-center items-center gap-4 pb-4">
    <img src="@/assets/images/seals/seal_max_note.webp" :width="140">

    <div>
      <li class="hidden sm:block text-orange text-xs sm:text-xs md:text-sm lg:text-md">RECREDENCIADA PELA PORTARIA MEC nº 826/2020 de 14/10/20</li>
      <li class="hidden sm:block text-orange text-xs sm:text-xs md:text-sm lg:text-md mt-4">CREDENCIAMENTO ENSINO À DISTÂNCIA PORTARIA MEC Nº 2.028, 21/11/19</li>
    </div>

    <img src="@/assets/images/seals/seal_better_university.webp" :width="140">
  </div>

  <div class="block sm:hidden bg-oil px-12 py-4">
    <li class="text-orange text-xs">RECREDENCIADA PELA PORTARIA MEC nº 826/2020 de 14/10/20</li>
    <li class="text-orange text-xs mt-4">CREDENCIAMENTO ENSINO À DISTÂNCIA PORTARIA MEC Nº 2.028, 21/11/19</li>
  </div>
</template>

<script>
  export default {
    name: 'seals-component',

    data: () => ({
      seals: [],
    }),

    methods: {
    },
  }
</script>
