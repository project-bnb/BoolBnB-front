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
      axios
        .get('http://127.0.0.1:8000/api/apartments')
        .then((res) => {
          this.apartments = res.data.data;
          store.suggestions = this.apartments.map((apartment) => apartment.address)
        })
        .catch((error) => console.error('Errore:', error));
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Card
        v-for="(property, index) in apartments.filter(apartment => apartment.is_visible).slice(0, 4)"
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
        :image="property.cover_images"
        :services="property.services"
        :is_visible="Boolean(property.is_visible)"
        class="transform transition duration-500 ease-in-out"
      />
    </transition-group>

    <div v-if="apartments.length === 0" class="text-center mt-12">
      <p class="text-[#EDEEF0] text-lg">
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
