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
        .get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`)
        .then((res) => {
          this.apartment = res.data.data;
          console.log(this.apartment);
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
  <div class="max-w-4xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-lg">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">
      {{ apartment.title }}
    </h1>
    <img :src="apartment.image" alt="Property Image" class="w-full h-80 object-cover mb-6 rounded-lg shadow-md" />
    <div class="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <p class="text-lg">
          <strong class="text-gray-700">Stanze:</strong> {{ apartment.rooms }}
        </p>
        <p class="text-lg">
          <strong class="text-gray-700">Letti:</strong> {{ apartment.beds }}
        </p>
        <p class="text-lg">
          <strong class="text-gray-700">Bagni:</strong> {{ apartment.bathrooms }}
        </p>
        <p class="text-lg">
          <strong class="text-gray-700">Metri Quadri: </strong> {{ apartment.square_meters }} m²
        </p>
        <p class="text-lg">
          <strong class="text-gray-700">Indirizzo: </strong> {{ apartment.address }}
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg">
          <strong class="text-gray-700">Servizi: </strong>
          <span v-for="(service, index) in apartment.services" :key="index">
            {{ service.name }}<span v-if="index < apartment.services.length - 1"> | </span>
          </span>
        </p>
      </div>
      <p class="text-lg">
        <strong class="text-gray-700">Visibilità: </strong>
        <span :class="apartment.is_visible ? 'text-green-600' : 'text-red-600'">
          {{ apartment.is_visible ? 'Visibile' : 'Non Visibile' }}
        </span>
      </p>
    </div>
    <div class="text-center">
      <router-link to="/" class="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Torna alla lista degli appartamenti
      </router-link>
    </div>
  </div>
</template

