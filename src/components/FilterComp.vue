<script>
import { store } from '../store';
import axios from 'axios';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      clickActive: false,
      isExpanded: true,
      hovering: false,
      minRooms: store.filters.minRooms,
      minBeds: store.filters.minBeds,
      radius: this.$route.query.radius ? parseInt(this.$route.query.radius) : 20,
      selectedServices: store.filters.selectedServices,
      availableServices: [
        "WiFi",
        "Cucina",
        "Lavatrice",
        "Riscaldamento",
        "Parcheggio",
        "Aria Condizionata",
        "Piscina",
        "TV"
      ],
      clickedServices: [],
    };
  },
  watch: {
    '$route.query.radius'(newRadius) {
      if (newRadius) {
        this.radius = parseInt(newRadius);
        store.filters.radius = this.radius;
        this.saveFilters();
      }
    },
    
    radius(newRadius) {
      store.filters.radius = newRadius;
      this.saveFilters();
    },
    'store.triggerFilter'(newVal) {
      if (newVal === true) {
        this.applyFilters();
        this.store.triggerFilter = false;
      }
    },
  },
  created() {
    // Inizializza il raggio dalla query o dal localStorage
    const queryRadius = this.$route.query.radius;
    if (queryRadius) {
      this.radius = parseInt(queryRadius);
      store.filters.radius = this.radius;
    } else {
      this.loadFilters();
    }
  },
  methods: {


     loadFilters() {
      // Carica i filtri salvati nel localStorage (se presenti)
      const savedFilters = JSON.parse(localStorage.getItem('filters'));
      if (savedFilters) {
        this.minRooms = savedFilters.minRooms || 1;
        this.minBeds = savedFilters.minBeds || 1;
        this.radius = savedFilters.radius || 20;
        this.clickedServices = savedFilters.selectedServices || [];
      }
    },

    saveFilters() {
      // Salva i filtri nel localStorage per renderli persistenti
      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [...this.clickedServices];
      localStorage.setItem('filters', JSON.stringify(store.filters));
    },

    convertDegreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
    },

    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    toggleService(service) {
      if (this.clickedServices.includes(service)) {
        this.clickedServices = this.clickedServices.filter((s) => s !== service);
      } else {
        this.clickedServices.push(service);
      }
      this.saveFilters(); // Salva i filtri ogni volta che cambia il servizio selezionato
    },

    getPosition(indirizzo) {
      const infoArrayAddress = [];
      const url = `http://192.168.1.101:9000/api/geocode?indirizzo=${encodeURIComponent(indirizzo)}`;
      
      return new Promise((resolve) => {
        axios.get(url)
          .then(response => {
            if (response.data.results && response.data.results.length > 0) {
              infoArrayAddress.latitude = response.data.results[0].position.lat;
              infoArrayAddress.longitude = response.data.results[0].position.lon;
              infoArrayAddress.address = response.data.results[0].address.freeformAddress;
              resolve(infoArrayAddress);
            } else {
              resolve(null);
            }
          })
          .catch(error => {
            console.error('Errore nella richiesta:', error);
            resolve(null);
          });
      });
    },

    filterByDistance(lat1, lon1, lat2, lon2) {
      lat1 = Number(parseFloat(lat1).toFixed(6));
      lon1 = Number(parseFloat(lon1).toFixed(6));
      lat2 = Number(parseFloat(lat2).toFixed(6));
      lon2 = Number(parseFloat(lon2).toFixed(6));

      const R = 6371; // raggio terra in km
      
      const dLat = this.convertDegreesToRadians(lat2 - lat1);
      const dLon = this.convertDegreesToRadians(lon2 - lon1);
      
      const lat1Rad = this.convertDegreesToRadians(lat1);
      const lat2Rad = this.convertDegreesToRadians(lat2);

      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      return Number(distance.toFixed(2));
    },

    applyFilters: debounce(async function() {
      try {
        this.saveFilters(); 
        const searchAddress = store.searchInput || this.$route.query.address;

        if (!searchAddress) {
          const response = await axios.get('http://192.168.1.101:9000/api/apartments');
          store.filters.filteredApartments = response.data.data;
          return;
        }
        
        const infoArrayAddress = await this.getPosition(searchAddress);
        
        if (!infoArrayAddress) {
          return;
        }

        const response = await axios.get('http://192.168.1.101:9000/api/apartments');
        const apartments = response.data.data;
        
        const filteredApartments = apartments.filter(apartment => {
          const distance = this.filterByDistance(
            infoArrayAddress.latitude,
            infoArrayAddress.longitude,
            apartment.latitude,
            apartment.longitude
          );
          
          apartment.distance = distance;
          return distance <= this.radius;
        });

        const isSpecificAddress = searchAddress && 
          !searchAddress.toLowerCase().includes('milano') && 
          searchAddress.length > 10;

        filteredApartments.sort((a, b) => {
          if (isSpecificAddress) {
            return a.distance - b.distance;
          } else {
            const priority = { Gold: 1, Silver: 2, Bronze: 3, 'No sponsorship': 4 };
            const aSponsor = a.sponsorships && a.sponsorships.length > 0 ? 
              a.sponsorships[0].name : 'No sponsorship';
            const bSponsor = b.sponsorships && b.sponsorships.length > 0 ? 
              b.sponsorships[0].name : 'No sponsorship';

            if (priority[aSponsor] === priority[bSponsor]) {
              return a.distance - b.distance;
            }
            
            return priority[aSponsor] - priority[bSponsor];
          }
        });

        store.filters.filteredApartments = filteredApartments;
        
      } catch (error) {
        console.error('Errore durante il filtraggio:', error);
      }
    }, 100),

    resetFilters() {
      this.minRooms = 1;
      this.minBeds = 1;
      this.radius = 20;
      this.clickedServices = [];
      
      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [];
      store.searchInput = '';
      
      store.filters.filteredApartments = undefined;
      
      this.saveFilters();
      this.$parent.getApartments();
    },
  },
};
</script>

<template>
  <div class="relative">
    <div class="fixed ml-5 md:w-12 md:h-12 z-100 md:scale-90 left-0 bottom-[37px] w-14 h-14 slide-in">
      <!-- Pulsante di Espansione del Menu Filtri -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 bg-[#B49578] text-white rounded-full flex items-center justify-center shadow-md z-100 transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'bg-[#EDEEF0] md:hover:opacity-100 hover:opacity-70 translate-x-2' : 'hover:bg-[#B49578] hover:translate-x-2']"
      >
        <i class="fa-solid fa-wand-magic-sparkles" :class="[isExpanded ? 'text-[#B49578]' : '']"></i>
      </button>
      <span
        class="absolute z-10 bottom-[15px] left-16 font-bold transition-all duration-500 ease-in-out md:hidden"
        :class="[isExpanded ? 'text-white translate-x-5' : (hovering ? 'translate-x-5 text-[#B49578]' : 'text-transparent -translate-x-5')]"
      >
        Filtri
      </span>
    </div>

    <!-- Pannello dei Filtri -->
    <transition name="slide">
      <div
        v-if="isExpanded"
        class="z-0 fixed left-0 top-0 mt-[68px] md:mt-[50px] 2xl:w-2/12 h-full md:top-0 md:h-[170px] md:grid md:w-screen md:overflow-x-scroll md:h-9/12 w-[11%] bg-[#B49578] filter-bar p-4 text-white transition-all duration-500 ease-in-out slide-in"
      >
        <!-- Filtri per l'utente -->
        <div class="md:grid md:grid-cols-11 md:gap-x-3 md:grid-rows-2 md:w-[1200px] md:h-full md:overflow-x-auto 2xl:overflow-y-scroll">
          <!-- Numero minimo di stanze -->
          <div class="mt-4 md:mt-0 md:order-1 md:col-span-2 md:inline-block">
            <label for="minRooms" class="block text-md font-bold">Numero minimo di stanze:</label>
            <input
              type="number"
              v-model="minRooms"
              id="minRooms"
              min="1"
              class="w-full rounded text-[#B49578] mt-1 p-1"
            />
          </div>

          <!-- Numero minimo di letti -->
          <div class="mt-4 md:mt-0 md:order-2 md:col-span-2 md:inline-block">
            <label for="minBeds" class="block text-md font-bold">Numero minimo di letti:</label>
            <input
              type="number"
              v-model="minBeds"
              id="minBeds"
              min="1"
              class="w-full rounded text-[#B49578] mt-1 p-1"
            />
          </div>

          <!-- Raggio di ricerca -->
          <div class="mt-4 md:mt-0 md:mr-4 md:order-start md:col-span-3 md:inline-block">
            <label for="radius" class="block text-md font-bold mb-2">Raggio di ricerca (km):</label>

            <!-- Contenitore per l'input range e il valore -->
            <div class="flex items-center gap-4 md:col-span-3">
              <!-- Input range -->
              <input
                type="range"
                v-model="radius"
                id="radius"
                min="1"
                max="100"
                class="w-full range-slider"
              />

              <!-- Mostra il valore del raggio in km -->
              <span class="font-semibold text-white">{{ radius }}</span>
            </div>
          </div>

          <!-- Servizi aggiuntivi -->
          <div class="mt-4 md:mt-0 md:flex md:flex-no-wrap md:order-first md:col-span-full">
            <label class="block text-md font-bold md:hidden">Servizi aggiuntivi:</label>
            <div v-for="service in availableServices" :key="service" class="mt-2 md:scale-75">
              <button
                type="button"
                :id="service"
                :value="service"
                @click="toggleService(service)"
                class="mr-2 rounded-full py-3 px-6 w-full transition-all duration-300 ease-in-out transform hover:scale-105"
                :class="{
                  'bg-[#E5E7EB] text-[#B49578] shadow-click': clickedServices.includes(service),
                  'bg-white text-[#BDAFA2]': !clickedServices.includes(service),
                }"
              >
                {{ service }}
              </button>
            </div>
          </div>

          <!-- Bottone per applicare i filtri -->
          <button
            @click="applyFilters"
            class="w-full bg-[#EDEEF0] text-[#B49578] py-2 px-4 rounded-lg shadow-md mt-6 hover:bg-[#B49578] hover:text-[#EDEEF0] transition-all ease-in-out duration-300 outline-filter md:scale-75 md:col-span-2 md:inline-block md:order-4 md:mt-4"
          >
            Applica Filtri
          </button>

          <!-- Bottone per resettare i filtri -->
          <button
            @click="resetFilters"
            class="w-full bg-black text-white py-2 px-4 rounded-lg shadow-md mt-3 md:mt-6 hover:bg-gray-600 transition duration-300 md:scale-75 md:order-5 md:col-span-2 md:inline-block md:mt-4"
          >
            Resetta Filtri
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

.slide-in {
  animation: SlideIn 0.5s ease-in-out;
}

@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.outline-filter{
  box-shadow: 0 0 5px #ffffff inset;
}

.range-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  background: white;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #B49578;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
}

.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #B49578;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
}

.range-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

.shadow-filter {
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.562);
}

/* Transizione slide-in e slide-out */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.h-filter {
  height: calc(100vh - 50px);
}

.shadow-click {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.712);
}

.border-filter{
  border: 1px solid white;
}

.z-100{
  z-index: 100;
}
</style>
