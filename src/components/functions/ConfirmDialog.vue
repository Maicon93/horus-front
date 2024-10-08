<template>
  <v-dialog v-model="dialog" :width="options.width" :style="{ zIndex: options.zIndex }" persistent>
    <v-card>
      <v-toolbar class="secondary" dense flat>
        <div class="p-2 text-white text-2xl">{{ title }}</div>
      </v-toolbar>

      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>

      <div class="flex gap-2 p-2 justify-space-between">
        <v-btn color="black" @click="cancel" class="btn-black">Cancelar</v-btn>
        <v-btn color="success" @click="agree" class="btn-black">Salvar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    message: null,
    title: 'Confirmação',
    options: {
      width: 400,
      zIndex: 200
    }
  }),

  methods: {
    open(message, options = {}) {
      this.dialog = true;
      this.message = message;
      this.options = Object.assign(this.options, options);

      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },

    agree() {
      this.resolve(true);
      this.dialog = false;
    },

    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>
