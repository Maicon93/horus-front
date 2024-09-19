<template>
  <div class="bg-black flex flex-col items-center">
    <div class="p-2 text-white text-justify w-full md:w-5/6 lg:w-5/6 xl:w-2/3">
      <v-card class="flex justify-center !p-2" style="min-height: calc(100vh - 9rem)">
        <slot></slot>
      </v-card>
    </div>
  </div>
</template>
