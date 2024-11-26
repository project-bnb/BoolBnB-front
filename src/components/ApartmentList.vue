<script>
import Card from './ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      apartments: [],
    }
  },

  components: {
    Card,
  },

  mounted() {
    this.getApartments();
  },

  watch: {
    'store.searchInput': function(newVal) {
      this.getApartments();
    },
  },
  
  methods: {
    getApartments() {
      console.log('funziona');
      axios
        .get('http://127.0.0.1:8000/api/apartments')
        .then((res) => {
          console.log(res);
          this.apartments = res.data.data;
          console.log(this.apartments);
          store.suggestions = this.apartments.map(apartment => apartment.address);
          console.log(store.suggestions);
        })
        .catch((error) => console.error('Errore:', error));
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-right">
      <Card
        v-for="(property, index) in apartments"
        :key="property.id"
        :id="property.id"
        :user_id="property.user_id"
        :title="property.title"
        :rooms="property.rooms"
        :beds="property.beds"
        :bathrooms="property.bathrooms"
        :square_meters="property.square_meters"
        :address="property.address"
        :latitude="property.latitude"
        :longitude="property.longitude"
        :image="property.image"
        :services="property.services"
        :is_visible="Boolean(property.is_visible)"
      />
    </div>
    <div v-if="apartments.length === 0" class="text-center mt-12">
      <p class="text-gray-500 text-lg">Nessun appartamento disponibile.</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-right {
  animation: fadeInRight 0.8s ease-out forwards;
}
</style>
