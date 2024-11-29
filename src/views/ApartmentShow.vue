<script>
import axios from 'axios';

export default {
  data() {
    return {
      apartment: {},
    };
  },
  mounted() {
    this.getApartment();
  },
  methods: {
    initMap() {
      const tt = window.tt;
      const latitude = parseFloat(this.apartment.latitude);
      const longitude = parseFloat(this.apartment.longitude);

      const map = tt.map({
        key: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7',
        container: 'map',
        center: [longitude, latitude], 
        zoom: 14
      });

      new tt.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    },
    getApartment() {
      const apartmentId = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`)
        .then((res) => {
          this.apartment = res.data.data;
          console.log('Appartamento:', this.apartment);
          this.initMap();
        })
        .catch((err) => {
          console.error('Errore:', err);
          this.$router.push({ name: 'not-found' });
        });
    },
  },
};
</script>

<template>
  <div class="max-w-5xl mx-auto p-8 mt-12 bg-[#EDEEF0] shadow-lg rounded-lg absolute top-[100px] right-0 left-[0]">
    <h1 class="text-4xl font-extrabold text-[#BFAFA2] mb-8 text-center tracking-wide">{{ apartment.title }}</h1>
    <img :src="apartment.cover_image" alt="Property Image" class="w-full h-80 object-cover mb-6 rounded-lg shadow-md">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="p-4 bg-[#EDEEF0] rounded-lg shadow-inner">
        <p class="text-lg font-semibold text-[#BFAFA2]"><strong>Stanze:</strong> {{ apartment.rooms }}</p>
        <p class="text-lg font-semibold text-[#BFAFA2]"><strong>Letti:</strong> {{ apartment.beds }}</p>
        <p class="text-lg font-semibold text-[#BFAFA2]"><strong>Bagni:</strong> {{ apartment.bathrooms }}</p>
      </div>
      <div class="p-4 bg-[#EDEEF0] rounded-lg shadow-inner">
        <p class="text-lg font-semibold text-[#BFAFA2]"><strong>Indirizzo:</strong> {{ apartment.address }}</p>
        <p class="text-lg font-semibold text-[#BFAFA2]"><strong>Metri Quadri:</strong> {{ apartment.square_meters }} m²</p>
      </div>
    </div>

    <!-- Servizi dell'appartamento -->
    <div v-if="apartment.services && apartment.services.length > 0" class="bg-[#BDAFA2] p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-bold text-[#EDEEF0] mb-4">Servizi Disponibili</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li v-for="(service, index) in apartment.services" :key="index" class="text-[#EDEEF0] font-semibold">
          {{ service.name }}
        </li>
      </ul>
    </div>

    <!-- Mappa -->
    <div id="map" class="w-full h-96 mt-6 rounded-lg shadow-md transition-shadow duration-500 hover:shadow-xl"></div>

    <!-- Bottone per tornare alla lista degli appartamenti -->
    <div class="text-center mt-8">
      <router-link to="/" class="inline-block bg-[#BFAFA2] text-[#EDEEF0] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#BDAFA2] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        Torna alla lista degli appartamenti
      </router-link>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px; 
  border-radius: 12px;
  margin-top: 20px;
}
</style>
