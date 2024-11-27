<script>
import Card from './ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      apartments: [],
    };
  },

  components: {
    Card,
  },

  mounted() {
    this.getApartments();
  },

  watch: {
    'store.searchInput': function () {
      this.getApartments();
    },
  },

  methods: {
    getApartments() {
      console.log('Recupero degli appartamenti in corso...');
      axios
        .get('http://192.168.1.101:9000/api/apartments')
        .then((res) => {
          this.apartments = res.data.data;
          console.log(this.apartments);
          store.suggestions = this.apartments.map((apartment) => apartment.address);
        })
        .catch((error) => console.error('Errore:', error));
    },
  },

  computed: {
    filteredApartments() {
      let filtered = this.apartments;

      if (this.store.searchInput) {
        filtered = filtered.filter((apartment) =>
          apartment.address.toLowerCase().includes(this.store.searchInput.toLowerCase())
        );
      }

      if (this.store.filters.minRooms) {
        filtered = filtered.filter((apartment) => apartment.rooms >= this.store.filters.minRooms);
      }

      if (this.store.filters.minBeds) {
        filtered = filtered.filter((apartment) => apartment.beds >= this.store.filters.minBeds);
      }

      if (this.store.filters.selectedServices.length > 0) {
        filtered = filtered.filter((apartment) => {
          const apartmentServices = apartment.services.map((service) => service.name);
          return this.store.filters.selectedServices.every((service) =>
            apartmentServices.includes(service)
          );
        });
      }

      return filtered;
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Card
        v-for="(property, index) in filteredApartments"
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
        class="transform transition duration-500 ease-in-out"
      />
    </transition-group>

    <div v-if="filteredApartments.length === 0" class="text-center mt-12">
      <p class="text-gray-500 text-lg">
        Nessun appartamento disponibile.
      </p>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
