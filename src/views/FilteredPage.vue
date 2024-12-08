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
    this.getApartments();
    setTimeout(() => {
      this.$refs.filterComp.applyFilters();
    }, 100);
  },

  methods: {
    /**
     * ottieni tutti gli appartamenti
     */
    getApartments() {
      axios
        .get('http://192.168.1.101:9000/api/apartments')
        .then((res) => {
          this.apartments = res.data.data;
          store.suggestions = this.apartments.map((apartment) => apartment.address);
        })
        .catch((error) => console.error('Errore:', error));
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Raggio della Terra in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c; // Distanza in km
    },

    deg2rad(deg) {
      return deg * (Math.PI/180);
    },
  },

  computed: {
    filteredApartments() {
      console.log('🔄 Inizio computed filteredApartments');
      let filtered = this.apartments.filter(apartment => apartment.is_visible);

      if (store.filters.filteredApartments !== undefined) {
        if (store.filters.filteredApartments.length === 0) {
          return [];
        }
        filtered = store.filters.filteredApartments;
        console.log('📊 Usando appartamenti filtrati dallo store:', filtered.map(apt => ({
          titolo: apt.title,
          distanza: apt.distance,
          sponsorizzazione: apt.sponsorships?.[0]?.name || 'No sponsorship'
        })));
      }

      if (filtered.length > 0 && this.store.filters.selectedServices.length > 0) {
        filtered = filtered.filter((apartment) => {
          const apartmentServices = apartment.services.map((service) => service.name);
          return this.store.filters.selectedServices.every((service) =>
            apartmentServices.includes(service)
          );
        });
      }

      if (filtered.length > 0 && this.store.filters.minRooms) {
        filtered = filtered.filter((apartment) => 
          apartment.rooms >= this.store.filters.minRooms
        );
      }

      if (filtered.length > 0 && this.store.filters.minBeds) {
        filtered = filtered.filter((apartment) => 
          apartment.beds >= this.store.filters.minBeds
        );
      }

      console.log('🏁 Array finale dal computed:', filtered.map(apt => ({
        titolo: apt.title,
        distanza: apt.distance,
        sponsorizzazione: apt.sponsorships?.[0]?.name || 'No sponsorship'
      })));

      return filtered;
    }
  },

  watch: {
    '$route.query.shouldFilter'(newVal) {
      if (newVal === 'true') {
        this.$refs.filterComp.applyFilters();
        // Rimuoviamo il flag dalla query dopo aver applicato i filtri
        const query = { ...this.$route.query };
        delete query.shouldFilter;
        this.$router.replace({ query });
      }
    }
  },
};
</script>

<template>
  <div v-if="$route.query.noResults === 'true'" class="text-center py-8">
    <p class="text-xl text-gray-600">
      Non ci sono appartamenti disponibili per "{{ $route.query.address }}"
    </p>
  </div>
  <FilterComp ref="filterComp" class="z-20"/>
  <div class="max-w-7xl mx-auto p-6 pt-0">
    <div v-if="filteredApartments.length === 0" 
         class="flex flex-col items-center justify-center min-h-[50vh] relative z-10">
      <i class="fas fa-search text-6xl text-[#B49578] mb-4"></i>
      <p class="text-[#B49578] text-lg font-semibold">
        Nessun appartamento trovato
      </p>
      <p class="text-gray-500 mt-2">
        Prova a modificare i filtri o cambia la zona di ricerca
      </p>
    </div>
    <transition-group
      v-else
      name="fade"
      tag="div"
      class="grid grid-cols-4 md:grid-cols-1 md:w-full xl:w-8/12 xl:grid-cols-2 2xl:w-9/12 2xl:grid-cols-3 sm:grid-cols-1 sm:w-9/12 sm:flex sm:flex-wrap 2xl:mx-auto md:grid-cols-1 lg:w-7/12 lg:mx-auto lg:grid-cols-1 gap-6"
    >
      <Card
        v-for="property in filteredApartments"
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
        :image="property.cover_image"
        :services="property.services"
        :price="property.price"
        :is_visible="Boolean(property.is_visible)"
        class="transform transition duration-500 ease-in-out"
      />
    </transition-group>
  </div>
  <TurnUp class="fixed z-[100] right-8 bottom-8"/>
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
