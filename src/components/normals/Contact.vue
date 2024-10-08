<template>
  <div class="bg-gray-300 p-12">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col space-y-4">
        <h2 class="text-center font-bold text-lg">Encontre-nos</h2>
        <div class="flex gap-2 items-center">
          <v-icon color="black">mdi-map-marker</v-icon>
          <div>
            <p>Av. Brasília - 625</p>
            <p>Pinhalzinho, SC 89870-000</p>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <v-icon color="black">mdi-email</v-icon>
          <a href="mailto:atendimento@horus.edu.br" class="hover:underline">
            atendimento@horus.edu.br
          </a>
        </div>

        <div class="flex gap-2 items-center">
          <v-icon color="black">mdi-phone</v-icon>
          <p>(49) 3366-1890</p>
        </div>

        <div class="flex gap-2 items-center">
          <v-icon icon="mdi-whatsapp" size="x-large" />
          <p>(49) 988685923</p>
        </div>

        <div class="flex gap-2 items-center">
          <v-icon icon="mdi-instagram" size="x-large" />
          <a href="https://www.instagram.com/horusfaculdadespzo/" target="_blank" class="hover:underline">
            @horusfaculdadespzo
          </a>
        </div>
    <div class="flex justify-center my-10">
      <div id="map" style="width: 600px; height: 300px; border-radius: 10px;"></div>
    </div>
      </div>

      <div class="bg-white mx-0 sm:mx-8 p-0 sm:p-6 rounded-lg shadow-md">
        <v-form>
          <div class="text-lg font-bold text-center pb-6">Envienos um e-mail que responderemos assim que possível</div>

          <v-text-field class="pb-2" v-model="form.name" label="Nome" variant="outlined" density="compact" hide-details />
          <v-text-field class="pb-2" v-model="form.email" label="Email" variant="outlined" density="compact" hide-details />
          <v-text-field class="pb-2" v-model="form.phone" label="Telefone" variant="outlined" density="compact" hide-details />
          <v-text-field class="pb-2" v-model="form.subject" label="Assunto" variant="outlined" density="compact" hide-details />

          <v-textarea
            v-model="form.message"
            label="Mensagem"
            variant="outlined"
            rows="5"
            hide-details
            density="compact"
          />

          <v-btn color="black" class="w-full mt-2" @click="submitForm" >
            <span class="text-white">Enviar</span>
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import leaflet from 'leaflet';
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
    },
  },

  mounted() {
    const map = leaflet.map('map', {
      scroleafletlWheelZoom: true,
      zoomControl: true
    }).setView([-26.840963100458175, -52.98685822972665], 13);
    map.setZoom(15)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    leaflet.marker([-26.840963100458175, -52.98685822972665]).addTo(map)
      .bindPopup('Horus Faculdades!')
      .openPopup();
  }
};
</script>

