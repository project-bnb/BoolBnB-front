<script>
import Card from './ApartmentCard.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      apartments: [],
      perPage: 4,
      currentPage: 0,
      hasAnimated: false, 
      transition: false
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
      .get('http://192.168.1.101:9000/api/apartments')
        .then((res) => {
          this.apartments = res.data.data.filter(
            apartment => apartment.is_visible && apartment.sponsorships && apartment.sponsorships.length > 0 && !apartment.sponsorships.some(sponsorship => sponsorship.name === 'No sponsorship')
          );

          this.apartments.sort((a, b) => {
            const priority = { Gold: 1, Silver: 2, Bronze: 3 };
            const aSponsor = a.sponsorships[0]?.name || "Bronze";
            const bSponsor = b.sponsorships[0]?.name || "Bronze";
            return priority[aSponsor] - priority[bSponsor];
          });

          store.suggestions = this.apartments.map((apartment) => apartment.address);

        })
        .catch((error) => console.error('Errore:', error));
    },

    NextPage() {
    if (this.currentPage < Math.ceil(this.apartments.length / this.perPage) - 1) {
      this.currentPage++;
    }
    this.hasAnimated = true;
  },

    PrevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }
  },

  computed: {
    paginatedApartments() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;
      return this.apartments.slice(start, end);
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto h-[432px] relative">
    <!-- Visualizzazione degli appartamenti -->
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      :key="currentPage"
    >
      <Card
        v-for="(property, index) in paginatedApartments"
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
        class="transform transition duration-500 ease-in-out hover:scale-105"
      />
    </transition-group>

    <!-- Bottone per la pagina precedente -->
    <button 
      @click="PrevPage" 
      class="absolute top-1/2 -left-20 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all hover:-translate-x-1 duration-300 ease-in-out"
    >
      <span class="text-xl font-bold">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
    </button>

    <!-- Bottone per la pagina successiva -->
    <button 
      @click="NextPage" 
      class="absolute top-1/2 -right-20 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all hover:translate-x-1 duration-300 ease-in-out"
    >
      <span class="text-xl font-bold">
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
</style>
