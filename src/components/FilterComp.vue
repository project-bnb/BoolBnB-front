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

    /**
     * migliorato il calcolo della distanza
     */
    isWithinSearchRadius(originLatitude, originLongitude, searchRadius, destinationLatitude, destinationLongitude) {
      // raggio della terra in km
      const EARTH_RADIO_DELLA_TERRA = 6371; 
      // conversione gradi radianti https://www.youmath.it/formulari/65-formulari-di-trigonometria-logaritmi-esponenziali/640-passare-dai-radianti-ai-gradi.html#:~:text=La%20conversione%20gradi%2Dradianti%20si,%C3%97r%5E(rad).
      const deltaLatitude = this.convertDegreesToRadians(destinationLatitude - originLatitude);
      const deltaLongitude = this.convertDegreesToRadians(destinationLongitude - originLongitude);
      
      // formula di haversine https://learn.microsoft.com/it-it/dotnet/api/system.device.location.geocoordinate.getdistanceto?view=netframework-4.8.1
      const a = 
        Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.cos(this.convertDegreesToRadians(originLatitude)) * Math.cos(this.convertDegreesToRadians(destinationLatitude)) * 
        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
      
      // calcolo della distanza 
      // atan2 è la funzione inversa della tangente potere di JAVASCRIPT
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = EARTH_RADIO_DELLA_TERRA * c; 
      
      return distance <= searchRadius;
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

    getPosition(indirizzo)
    {
        const infoArrayAddress = [];
        const url = `http://192.168.1.101:9000/api/geocode?indirizzo=${encodeURIComponent(indirizzo)}`;
return axios.get(url)
    .then(response => {
        infoArrayAddress.latitude = response.data.results[0].position.lat;
        infoArrayAddress.longitude = response.data.results[0].position.lon;
        infoArrayAddress.address = response.data.results[0].address.freeformAddress;
        return infoArrayAddress;
    })
        .catch(error => {
            console.error('Error:', error);
        });

    },

    async applyFilters() {
      try {
        this.saveFilters(); 
        
        // ottieni le coordinate dell'indirizzo
        const infoArrayAddress = await this.getPosition(store.searchInput);
        
        //se non riesce a ottenere le coordinate dell'indirizzo
        if (!infoArrayAddress) {
          console.error('impossibile ottenere le coordinate dell\'indirizzo');
          return;
        }

        // ottieni tutti gli appartamenti
        const response = await axios.get('http://192.168.1.101:9000/api/apartments');
        const apartments = response.data.data;
        
        // filtra gli appartamenti in base al raggio di ricerca
        const filteredApartments = apartments.filter(apartment => {
          const isInRange = this.isWithinRadius(
            infoArrayAddress.latitude, 
            infoArrayAddress.longitude, 
            this.radius,
            apartment.latitude,
            apartment.longitude
          );
          
          return isInRange;
        });
        
        // aggiorna lo store con gli appartamenti filtrati
        store.filters.filteredApartments = filteredApartments;
        
      } catch (error) {
        console.error('stampa errore:', error);
      }
    },

    resetFilters() {
      this.minRooms = 1;
      this.minBeds = 1;
      this.radius = 20;
      this.clickedServices = [];
      
      
      store.filters.filteredApartments = [];
      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [];
      
      store.searchInput = '';
      
      this.saveFilters();
      
      //richiamo del metodo getApartments per aggiornare la lista degli appartamenti
      // https://www.reddit.com/r/vuejs/comments/c1uwde/when_to_use_emit_vs_parent_when_changing_parent/?rdt=35049
      this.$parent.getApartments();
    }
  },
};
</script>

<template>
  <div class="relative">
    <div class="fixed ml-5 md:w-12 md:h-12 md:scale-90 left-0 bottom-[37px] w-14 h-14 z-20 slide-in">
      <!-- Pulsante di Espansione del Menu Filtri -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 bg-[#B49578] z-40 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-in-out"
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
        <div class="md:grid md:grid-cols-11 md:gap-x-3 md:grid-rows-2 md:w-[1200px] md:h-full md:overflow-x-auto">
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
</style>
