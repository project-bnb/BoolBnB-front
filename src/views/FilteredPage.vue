<script>
import FilterComp from '../components/FilterComp.vue';
import Card from '../components/ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';
import TurnUp from '../components/TurnUp.vue';
import JumboStatic from '../Header/Components/JumboStatic.vue';

export default {
  data() {
    return {
      store,
      apartments: [],
    };
  },

  components: {
    Card,
    FilterComp,
    TurnUp,
    JumboStatic,
  },

  mounted() {
    this.fetchApartments();
  },

  watch: {
    'store.searchInput': function () {
      this.getApartments();
    },
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
  },

  computed: {
    filteredApartments() {
      if (!this.apartments.length) return [];

      let filtered = this.apartments;

      filtered = filtered.filter(apartment => 
        apartment.is_visible === 1 || apartment.is_visible === true
      );

      if (this.store.filters.minRooms) {
        filtered = filtered.filter(apartment => apartment.rooms >= this.store.filters.minRooms);
      }

      if (this.store.filters.minBeds) {
        filtered = filtered.filter(apartment => apartment.beds >= this.store.filters.minBeds);
      }

      if (this.store.filters.selectedServices.length > 0) {
        filtered = filtered.filter(apartment => {
          const apartmentServices = apartment.services.map(service => service.name);
          return this.store.filters.selectedServices.every(service =>
            apartmentServices.includes(service)
          );
        });
      }

      filtered.sort((a, b) => {
        const priority = { Gold: 1, Silver: 2, Bronze: 3, 'No sponsorship': 4 };
        
        const aSponsor = a.sponsorships && a.sponsorships.length > 0 ? a.sponsorships[0].name : 'No sponsorship';
        const bSponsor = b.sponsorships && b.sponsorships.length > 0 ? b.sponsorships[0].name : 'No sponsorship';

        return priority[aSponsor] - priority[bSponsor];
      });

      if (this.$route.query.lat && this.$route.query.lon) {
        const searchLat = parseFloat(this.$route.query.lat);
        const searchLon = parseFloat(this.$route.query.lon);
        const SEARCH_RADIUS = 20; 

        filtered.forEach(apartment => {
          const distance = this.calculateDistance(
            searchLat,
            searchLon,
            parseFloat(apartment.latitude),
            parseFloat(apartment.longitude)
          );
          apartment.distance = distance;
        });

        filtered = filtered
          .filter(apartment => apartment.distance !== null && apartment.distance <= SEARCH_RADIUS)
          .sort((a, b) => a.distance - b.distance);
      }

      return filtered;
    }
  },
};
</script>

<template>
  <FilterComp />
  <div class="max-w-7xl mx-auto p-6 pt-0">
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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

    <div v-if="filteredApartments.length === 0" class="text-center mt-12">
      <p class="text-gray-500 text-lg">
        Nessun appartamento disponibile.
      </p>
    </div>
  </div>
  <TurnUp class="fixed right-8 bottom-8"/>
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
