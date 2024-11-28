<script>
import { store } from '../store';

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
      clickedServices: [] 
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    toggleService(service) {
      if (this.clickedServices.includes(service)) {
        this.clickedServices = this.clickedServices.filter((s) => s !== service);
      } else {
        this.clickedServices.push(service);
      }
    },

    applyFilters() {
      store.filters.minRooms = this.minRooms;
      store.filters.minBeds = this.minBeds;
      store.filters.radius = this.radius;
      store.filters.selectedServices = [...this.clickedServices];

      console.log("Filtri applicati:", store.filters);
    },

    resetFilters() {
      this.minRooms = 1;
      this.minBeds = 1;
      this.radius = 20;
      this.clickedServices = []; 

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
    <div class="fixed ml-3 left-0 bottom-[45px] w-14 h-14 z-50">
      <!-- Pulsante di Espansione del Menu Filtri -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 bg-[#B49578] z-50 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'bg-[#EDEEF0] hover:bg-[#BDAFA2] translate-x-2' : 'hover:bg-[#B49578] hover:translate-x-2']"
      >
        <i class="fa-solid fa-wand-magic-sparkles" :class="[isExpanded ? 'text-[#B49578]' : '']"></i>
      </button>
      <span
        class="absolute z-10 bottom-[20px] left-16 font-bold transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'text-white translate-x-5' : (hovering ? 'translate-x-5 text-[#B49578]' : 'text-transparent -translate-x-5')]"
      >
        Filtri
      </span>
    </div>

    <!-- Pannello dei Filtri che si espande sotto al pulsante -->
    <transition name="slide">
      <div
        v-if="isExpanded"
        class="z-0 fixed left-0 top-0 h-filter w-[11%] bg-[#B49578] filter-bar p-4 text-white transition-all duration-500 ease-in-out"
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
            <label for="radius" class="block text-sm font-bold">Raggio di ricerca (km):</label>
            <input
              type="number"
              v-model="radius"
              id="radius"
              min="1"
              class="w-full rounded text-[#B49578] mt-1 p-1"
            />
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
                class="mr-2 rounded-full py-3 px-6 w-full bg-[#EDEEF0] text-[#BDAFA2] transition-all duration-300 ease-in-out"
                :class="{ 'shadow-click': clickedServices.includes(service) }"
              >
                {{ service }}
              </button>
            </div>
          </div>

          <!-- Bottone per applicare i filtri -->
          <button
            @click="applyFilters"
            class="w-full bg-[#EDEEF0] text-[#B49578] py-2 px-4 rounded-lg shadow-md mt-6 hover:bg-[#B49578] hover:text-[#EDEEF0] transition duration-300"
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
</style>
