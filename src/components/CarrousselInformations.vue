<template>
  <div class="bg-black h-50 flex justify-center">
    <div class="w-full sm:w-3/3 md:w-3/3 lg:w-3/3 xl:w-4/5 xl:w-3/4">
      <v-carousel height="630" hide-delimiter-background cover cycle>
        <v-carousel-item
          src="src/assets/images/neuropsicopedagogia.png"
          color="black"
        ></v-carousel-item>

        <v-carousel-item
          src="src/assets/images/mba_horus.png"
          color="black"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'notices-commponent',

    data: () => ({
    }),

    mounted() {

    }
  }
</script>
