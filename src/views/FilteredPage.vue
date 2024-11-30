<script>
import FilterComp from '../components/FilterComp.vue';
import Card from '../components/ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';
import TurnUp from '../components/TurnUp.vue';

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
          store.suggestions = this.apartments.map((apartment) => apartment.address);
        })
        .catch((error) => console.error('Errore:', error));
    },
  },

  computed: {
    filteredApartments() {
      let filtered = this.apartments;

      // Filtrare in base alla ricerca per indirizzo
      if (this.store.searchInput) {
        const searchTerms = this.store.searchInput.toLowerCase().split(' ');
        filtered = filtered.filter((apartment) => {
          const apartmentText = `${apartment.title} ${apartment.address}`.toLowerCase();
          return searchTerms.every(term => apartmentText.includes(term));
        });
      }

      // Filtrare in base al numero minimo di stanze
      if (this.store.filters.minRooms) {
        filtered = filtered.filter((apartment) => apartment.rooms >= this.store.filters.minRooms);
      }

      // Filtrare in base al numero minimo di letti
      if (this.store.filters.minBeds) {
        filtered = filtered.filter((apartment) => apartment.beds >= this.store.filters.minBeds);
      }

      // Filtrare in base ai servizi selezionati
      if (this.store.filters.selectedServices.length > 0) {
        filtered = filtered.filter((apartment) => {
          const apartmentServices = apartment.services.map((service) => service.name);
          return this.store.filters.selectedServices.every((service) =>
            apartmentServices.includes(service)
          );
        });
      }

      // Ordinare gli appartamenti in base alla sponsorizzazione
      filtered.sort((a, b) => {
        const priority = { Gold: 1, Silver: 2, Bronze: 3, 'No sponsorship': 4 };
        
        // Ottenere il tipo di sponsorizzazione per ogni appartamento
        const aSponsor = a.sponsorships && a.sponsorships.length > 0 ? a.sponsorships[0].name : 'No sponsorship';
        const bSponsor = b.sponsorships && b.sponsorships.length > 0 ? b.sponsorships[0].name : 'No sponsorship';
        
        // Ordinare gli appartamenti in base alla priorità di sponsorizzazione
        return priority[aSponsor] - priority[bSponsor];
      });

      return filtered;
    },
  },
};
</script>

<template>
  <FilterComp />
  <div class="max-w-7xl mx-auto p-6 pt-0 transform -translate-y-[290px]">
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
        :image="property.cover_image"
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
