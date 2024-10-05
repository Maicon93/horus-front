<template>
  <div class="bg-oil h-50 flex justify-center">
    <div class="w-full sm:w-3/3 md:w-3/3 lg:w-3/3 xl:w-4/5 xl:w-3/4">
      <v-carousel :height="size" hide-delimiter-background cover cycle>
        <v-carousel-item
          src="src/assets/images/neuropsicopedagogia.png"
          color="#00051a"
        ></v-carousel-item>

        <v-carousel-item
          src="src/assets/images/mba_horus.png"
          color="#00051a"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'notices-commponent',

    data: () => ({
      size: '600',
    }),

    mounted() {
      switch (this.$calculateSizeWidth()) {
        case 'xxs':
          this.size = '200'
          break;
        case 'xs':
          this.size = '300'
          break;
        case 'sm':
          this.size = '400'
          break;
        case 'md':
          this.size = '500'
          break;
        case 'lg':
          this.size = '600'
          break;
        case 'xl':
          this.size = '700'
          break;
        case 'xxl':
          this.size = '700'
          break;

        default:
          this.size = '500'
          break;
      }
    }
  }
</script>
