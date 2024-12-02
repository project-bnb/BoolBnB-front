<script>
import { store } from '../store';
import axios from 'axios';

export default {
  data() {
    return {
      clickActive: false,
      isExpanded: true,
      hovering: false,
      minRooms: store.filters.minRooms,
      minBeds: store.filters.minBeds,
      radius: store.filters.radius,
      selectedServices: store.filters.selectedServices,
      availableServices: [
        "WiFi",
        "Cucina",
        "Lavatrice",
        "Riscaldamento",
        "Parcheggio",
        "Aria Condizionata"
      ],
      clickedServices: [],
    };
  },
  watch: {
    radius(newRadius) {
      store.filters.radius = newRadius;
      this.saveFilters();
    },
  },
  created() {
    // Carica i filtri dal localStorage quando il componente è creato
    this.loadFilters();
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

    isWithinRadius(originLat, originLon, radius, destinationLat, destinationLon) {
      const positionLat = destinationLat;
      const positionLon = destinationLon;

      const haversine = (lat, lon) => {
        const R = 6371; // raggio della terra in km
        const toRad = (deg) => deg * (Math.PI / 180);
        const dLat = toRad(lat - positionLat);
        const dLon = toRad(lon - positionLon);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(toRad(lat)) * Math.cos(toRad(positionLat)) *
                  Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distanza in km
      };
      return haversine(originLat, originLon) <= radius;
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

    getPosition(indirizzo)
    {
        const infoArrayAddress = [];
        console.log('questo è indirizzo', indirizzo);
        const url = `http://127.0.0.1:8000/api/geocode?indirizzo=${encodeURIComponent(indirizzo)}`;
return axios.get(url)
    .then(response => {
        console.log('questo è response', response.data.results[0]);
        infoArrayAddress.latitude = response.data.results[0].position.lat;
        infoArrayAddress.longitude = response.data.results[0].position.lon;
        infoArrayAddress.address = response.data.results[0].address.freeformAddress;
        console.log('questo è infoArrayAddress', infoArrayAddress);
        return infoArrayAddress;
    })
        .catch(error => {
            console.error('Error:', error);
        });

    },

    async applyFilters() {
      this.saveFilters(); // Salva tutti i filtri prima di applicarli



      // Filtra tramite radius e salva gli appartamenti filtrati

      axios.get('http://127.0.0.1:8000/api/apartments')
        .then(async (res) => {
          const filteredApartments = [];

          const infoArrayAddress = await this.getPosition(store.searchInput);

          store.filters.filteredSuggestions = [];
          for (let i = 0; i < res.data.data.length; i++) {
            const apartment = res.data.data[i];
            const isInRadius = this.isWithinRadius(infoArrayAddress.latitude, infoArrayAddress.longitude, this.radius, apartment.latitude, apartment.longitude);

            if (isInRadius) {
              store.filters.filteredSuggestions.push(apartment);
              filteredApartments.push(apartment);
              store.filters.filteredApartments = filteredApartments;
            }
          }
        })
        .catch((error) => console.error('error:', error));



      console.log("filters applied:", store.filters);
    },

    resetFilters() {
      this.minRooms = 1;
      this.minBeds = 1;
      this.radius = 20;
      this.clickedServices = [];
      store.filters.filteredApartments = [];
      store.searchInput = '';

      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [];

      this.saveFilters();
    }
  },
};
</script>

<template>
  <div class="relative">
    <div class="fixed ml-5 left-0 bottom-[45px] w-14 h-14 z-50 slide-in">
      <!-- Pulsante di Espansione del Menu Filtri -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 bg-[#B49578] z-50 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'bg-[#EDEEF0] hover:opacity-70 translate-x-2' : 'hover:bg-[#B49578] hover:translate-x-2']"
      >
        <i class="fa-solid fa-wand-magic-sparkles" :class="[isExpanded ? 'text-[#B49578]' : '']"></i>
      </button>
      <span
        class="absolute z-10 bottom-[15px] left-16 font-bold transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'text-white translate-x-5' : (hovering ? 'translate-x-5 text-[#B49578]' : 'text-transparent -translate-x-5')]"
      >
        Filtri
      </span>
    </div>

    <!-- Pannello dei Filtri che si espande sotto al pulsante -->
    <transition name="slide">
      <div
        v-if="isExpanded"
        class="z-0 fixed left-0 top-0 h-filter w-[11%] bg-[#B49578] filter-bar p-4 text-white transition-all duration-500 ease-in-out slide-in"
      >
        <!-- Filtri per l'utente -->
        <div>
          <!-- Numero minimo di stanze -->
          <div class="mt-4">
            <label for="minRooms" class="block text-sm font-bold">Numero minimo di stanze:</label>
            <input
              type="number"
              v-model="minRooms"
              id="minRooms"
              min="1"
              class="w-full rounded text-[#B49578] mt-1 p-1"
            />
          </div>

          <!-- Numero minimo di letti -->
          <div class="mt-4">
            <label for="minBeds" class="block text-sm font-bold">Numero minimo di letti:</label>
            <input
              type="number"
              v-model="minBeds"
              id="minBeds"
              min="1"
              class="w-full rounded text-[#B49578] mt-1 p-1"
            />
          </div>

          <!-- Raggio di ricerca -->
          <div class="mt-4">
            <label for="radius" class="block text-sm font-bold mb-2">Raggio di ricerca (km):</label>

            <!-- Contenitore per l'input range e il valore -->
            <div class="flex items-center gap-4">
              <!-- Input range migliorato esteticamente -->
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
          <div class="mt-4">
            <label class="block text-sm font-bold">Servizi aggiuntivi:</label>
            <div v-for="service in availableServices" :key="service" class="mt-2">
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
            class="w-full bg-[#EDEEF0] text-[#B49578] py-2 px-4 rounded-lg shadow-md mt-6 hover:bg-[#B49578] hover:text-[#EDEEF0] transition-all ease-in-out duration-300 outline-filter"
          >
            Applica Filtri
          </button>

          <!-- Bottone per resettare i filtri -->
          <button
            @click="resetFilters"
            class="w-full bg-black text-white py-2 px-4 rounded-lg shadow-md mt-3 hover:bg-gray-600 transition duration-300"
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
  margin-top: 68px;
  height: calc(100vh - 68px);
}

.shadow-click {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.712);
}

.border-filter{
  border: 1px solid white;
}
</style>
