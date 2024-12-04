<script>
import Card from './ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      apartments: [],
      currentIndex: 0,
      itemsPerPage: 4, // Numero di card visibili per volta
    };
  },

  components: {
    Card,
  },

  mounted() {
    this.getApartments();
    this.updateItemsPerPage();
    window.addEventListener('resize', this.updateItemsPerPage);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateItemsPerPage);
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
          let apartments = res.data.data.filter(
            (apartment) =>
              apartment.is_visible &&
              apartment.sponsorships &&
              apartment.sponsorships.length > 0 &&
              !apartment.sponsorships.some((sponsorship) => sponsorship.name === 'No sponsorship')
          );

          // Filtra gli appartamenti in base alla ricerca
          if (store.searchInput) {
            const searchTerm = store.searchInput.toLowerCase();
            apartments = apartments.filter(apartment => 
              apartment.address.toLowerCase().includes(searchTerm)
            );
          }

          this.apartments = apartments;

          this.apartments.sort((a, b) => {
            const priority = { Gold: 1, Silver: 2, Bronze: 3 };
            const aSponsor = a.sponsorships[0]?.name || 'Bronze';
            const bSponsor = b.sponsorships[0]?.name || 'Bronze';
            return priority[aSponsor] - priority[bSponsor];
          });

          store.suggestions = this.apartments.map((apartment) => apartment.address);
        })
        .catch((error) => console.error('Errore:', error));
    },

    updateItemsPerPage() {
      if (window.innerWidth >= 1024) {
        this.itemsPerPage = 4;
      } else if (window.innerWidth >= 768) {
        this.itemsPerPage = 3;
      } else {
        this.itemsPerPage = 1;
      }
    },

    NextCard() {
      if (this.currentIndex < this.apartments.length - this.itemsPerPage) {
        this.currentIndex = this.currentIndex + this.itemsPerPage;
      }
    },

    PrevCard() {
      if (this.currentIndex > 0) {
        this.currentIndex = this.currentIndex - this.itemsPerPage;
      }
    },
  },

  computed: {
    visibleApartments() {
      return this.apartments.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto relative px-8 sm:px-6 lg:px-8 lg:scale-75 2xl:scale-90 md:w-full md:scale-75 xl:scale-90">
    <!-- Bottone per la slide precedente -->
    <button 
      @click="PrevCard" 
      class="absolute top-1/2 -left-12 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all hover:-translate-x-1 duration-300 ease-in-out z-10"
    >
      <span class="text-sm sm:text-xl font-bold">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
    </button>

    <!-- Visualizzazione degli appartamenti in modalità carosello -->
    <div class="overflow-visible">
      <div
        class="flex gap-6 transition-all ease-in-out duration-500"
        :style="{ transform: `-translateX(${currentIndex * (100 / itemsPerPage)}%)` }"
      >
        <Card
          v-for="(property, index) in visibleApartments"
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
          :price="property.price"
          class="w-full md:w-full lg:w-1/3 sm:w-full transform transition duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>

    <!-- Bottone per la slide successiva -->
    <button 
      @click="NextCard" 
      class="absolute top-1/2 -right-12 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all hover:translate-x-1 duration-300 ease-in-out z-10"
    >
      <span class="text-sm sm:text-xl font-bold">
        <i class="fa-solid fa-arrow-right"></i>
      </span>
    </button>

    <!-- Messaggio se non ci sono appartamenti disponibili -->
    <div v-if="apartments.length === 0" class="text-center mt-12">
      <p class="text-[#EDEEF0] text-lg">
        Nessun appartamento disponibile.
      </p>
    </div>
  </div>
</template>


<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.scale-25{
  scale: 0.25;
}
</style>
