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
    getApartment() {
      const apartmentId = this.$route.params.id;
      axios
        .get(`http://192.168.1.101:9000/api/apartments/${apartmentId}`)
        .then((res) => {
          this.apartment = res.data.data;
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
  <div class="max-w-4xl mx-auto p-8 mt-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">{{ apartment.title }}</h1>
    <img :src="apartment.image" alt="Property Image" class="w-full h-64 object-cover mb-4 rounded" />
    <div class="mb-4">
      <p class="text-lg"><strong>Stanze:</strong> {{ apartment.rooms }}</p>
      <p class="text-lg"><strong>Letti:</strong> {{ apartment.beds }}</p>
      <p class="text-lg"><strong>Bagni:</strong> {{ apartment.bathrooms }}</p>
      <p class="text-lg"><strong>Metri Quadri:</strong> {{ apartment.square_meters }} m²</p>
      <p class="text-lg"><strong>Indirizzo:</strong> {{ apartment.address }}</p>
      <p class="text-lg"><strong>Coordinate:</strong> {{ apartment.latitude }}, {{ apartment.longitude }}</p>
      <p class="text-lg"><strong>Visibilità:</strong> {{ apartment.is_visible ? 'Visibile' : 'Non Visibile' }}</p>
    </div>
    <router-link to="/apartment-list" class="text-blue-500 hover:underline">Torna alla lista degli appartamenti</router-link>
  </div>
</template>

