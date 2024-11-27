<script>
import { store } from '../store';

export default {
  data() {
    return {
      isExpanded: false,
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
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    TurnUp() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    applyFilters() {
      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [...this.selectedServices];

      console.log("Filtri applicati:", store.filters);
    },

    resetFilters() {
      this.minRooms = 1;
      this.minBeds = 1;
      this.radius = 20;
      this.selectedServices = [];

      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [];

    }
  },
};
</script>

<template>
  <div class="relative">
    <div class="fixed w-14 h-14 z-50">
      <!-- Pulsante di Espansione del Menu Filtri -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 ml-4 bg-teal-600 z-50 text-white fixed left-0 top-1/6 rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'bg-white hover:bg-gray-100 translate-x-2' : 'hover:bg-teal-700 hover:translate-x-2']"
      >
        <i class="fa-solid fa-wand-magic-sparkles"
           :class="[isExpanded ? 'text-teal-600' : '']">
        </i>
      </button>
      <span
        class="absolute z-10 top-[2px] left-[50px] transform translate-y-1/2 font-bold transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'text-white translate-x-11' : (hovering ? 'translate-x-11 text-teal-700' : 'text-white -translate-x-11')]"
      >
        Filtri
      </span>
    </div>

    <!-- Pannello dei Filtri che si espande sotto al pulsante -->
    <transition name="expand">
      <div
        :class="[ 
          isExpanded ? 'z-0 fixed left-[0] top-[0] h-screen w-[11%] bg-teal-600 filter-bar shadow-filter transition-all duration-300 ease-in-out' : 'transition-all duration-300 ease-in-out rounded-full h-0 w-0 fixed left-[16px] top-[100px]'
        ]">
        <div v-if="isExpanded" class="grid p-4 text-white">

          <!-- Logo per risalire -->
          <div
            @click="TurnUp"
            class="text-2xl font-bold justify-self-center mt-4 cursor-pointer">
            MilanBnb
          </div>

          <!-- Filtri per l'utente -->
          <div class="transform translate-y-24">

            <!-- Numero minimo di stanze -->
            <div class="mt-6">
              <label for="minRooms" class="block text-sm font-bold">Numero minimo di stanze:</label>
              <input
                type="number"
                v-model="minRooms"
                id="minRooms"
                min="1"
                class="w-full rounded text-teal-600 mt-1 p-1"
              />
            </div>
  
            <!-- Numero minimo di letti -->
            <div class="mt-6">
              <label for="minBeds" class="block text-sm font-bold">Numero minimo di letti:</label>
              <input
                type="number"
                v-model="minBeds"
                id="minBeds"
                min="1"
                class="w-full rounded text-teal-600 mt-1 p-1"
              />
            </div>
  
            <!-- Raggio di ricerca -->
            <div class="mt-6">
              <label for="radius" class="block text-sm font-bold">Raggio di ricerca (km):</label>
              <input
                type="number"
                v-model="radius"
                id="radius"
                min="1"
                class="w-full rounded text-teal-600 mt-1 p-1"
              />
            </div>
  
            <!-- Servizi aggiuntivi -->
            <div class="mt-6">
              <label class="block text-sm font-bold">Servizi aggiuntivi:</label>
              <div v-for="service in availableServices" :key="service" class="mt-2">
                <input
                  type="checkbox"
                  :id="service"
                  :value="service"
                  v-model="selectedServices"
                  class="mr-2"
                />
                <label :for="service" class="text-sm">{{ service }}</label>
              </div>
            </div>
  
            <!-- Bottone per applicare i filtri -->
            <button
              @click="applyFilters"
              class="w-full bg-white text-teal-600 py-2 px-4 rounded-lg shadow-md mt-6 hover:bg-teal-700 hover:text-white transition duration-300"
            >
              Applica Filtri
            </button>

            <!-- Bottone per resettare i filtri -->
            <button
              @click="resetFilters"
              class="w-full bg-white text-teal-600 py-2 px-4 rounded-lg shadow-md mt-3 hover:bg-red-500 hover:text-white transition duration-300"
            >
              Resetta Filtri
            </button>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.shadow-filter {
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.562);
}
</style>
