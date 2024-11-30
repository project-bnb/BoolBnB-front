
<script>
import { store } from '../store';
import Card from '../components/ApartmentCard.vue';
import axios from 'axios';
import JumboStatic from '../Header/Components/JumboStatic.vue';

export default {
  components: {
    Card,
    JumboStatic,
  },

  data() {
    return {
      store,
      apartments: [],
      loading: true,
      error: null
    };
  },

  mounted() {
    this.fetchApartments();
  },

  computed: {
    filteredApartments() {
      if (!this.apartments.length) return [];

      let filtered = this.apartments;

      // Filtra per is_visible
      filtered = filtered.filter(apartment => 
        apartment.is_visible === 1 || apartment.is_visible === true
      );

      // Filtra per distanza
      if (this.$route.query.lat && this.$route.query.lon) {
        const searchLat = parseFloat(this.$route.query.lat);
        const searchLon = parseFloat(this.$route.query.lon);
        const SEARCH_RADIUS = 20; // km

        filtered.forEach(apartment => {
          const distance = this.calculateDistance(
            searchLat,
            searchLon,
            parseFloat(apartment.latitude),
            parseFloat(apartment.longitude)
          );
          apartment.distance = distance;
        });

        // Filtriamo e ordiniamo
        filtered = filtered
          .filter(apartment => apartment.distance !== null && apartment.distance <= SEARCH_RADIUS)
          .sort((a, b) => a.distance - b.distance);
      }

      return filtered;
    }
  },

  methods: {
    async fetchApartments() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/apartments');
        this.apartments = response.data.data;
        this.loading = false;
      } catch (error) {
        this.error = 'Errore nel caricamento degli appartamenti';
        this.loading = false;
      }
    },

    normalizeAddress(address) {
      return address
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/,/g, '')
        .replace(/\./g, '')
        .replace(/via/i, '')
        .trim();
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = this.toRad(lat2 - lat1);
      const dLon = this.toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },

    toRad(value) {
      return (value * Math.PI) / 180;
    }
  }
};
</script>

<template>
    <JumboStatic />
  <div class="max-w-7xl mx-auto p-6">
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Caricamento appartamenti...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <div v-else>
      <transition-group
        name="fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 -translate-y-[290px]"
      >
        <Card
          v-for="apartment in filteredApartments"
          :key="apartment.id"
          :id="apartment.id"
          :user_id="apartment.user_id"
          :title="apartment.title"
          :rooms="apartment.rooms"
          :beds="apartment.beds"
          :bathrooms="apartment.bathrooms"
          :square_meters="apartment.square_meters"
          :address="apartment.address"
          :latitude="apartment.latitude"
          :longitude="apartment.longitude"
          :image="apartment.cover_image"
          :services="apartment.services"
          :is_visible="Boolean(apartment.is_visible)"
          class="transform transition duration-500 ease-in-out"
        />
      </transition-group>

      <div v-if="filteredApartments.length === 0" class="text-center py-8">
        <p class="text-gray-500">
          Nessun appartamento trovato vicino a "{{ $route.query.address }}"
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
