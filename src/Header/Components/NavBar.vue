<script>
import axios from 'axios';
import { store } from '../../store';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      store,
      isScrolled: false,
      selected: false,
      submit: false,
    };
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.isAuthenticated = !!localStorage.getItem('AuthToken');
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    isApartmentShowPage() {
      return this.$route.name === 'apartment-show';
    },
  },

  methods: {
    getSuggestion: debounce(function () {
      this.submit = false;
      this.selected = false;
      axios
        .get('http://192.168.1.101:9000/api/apartments')
        .then((res) => {
          this.store.suggestions = res.data.data.filter(apartment => apartment.is_visible === 1);
          console.log(this.store.suggestions);

          this.store.filteredSuggestions = this.store.suggestions
            .filter((suggestion) =>
              suggestion.address
                .toLowerCase()
                .includes(this.store.searchInput.toLowerCase())
            )
            .map((suggestion) => suggestion.address)
            .slice(0, 10);

          if (this.store.filteredSuggestions.length === 0) {
            this.store.filteredSuggestions = ['Nessun risultato trovato'];
          }
        })
        .catch((error) => {
          console.error('Errore nel recupero dei suggerimenti:', error);
        });
    }, 300),

    handleScroll() {
      if (this.isApartmentShowPage) {
        return;
      }

      this.isScrolled = window.scrollY > 50;
    },

    clearSuggestions() {
      setTimeout(() => {
        this.store.filteredSuggestions = [];
      }, 200);
    },

    selectSuggestion(suggestion) {
      this.store.searchInput = suggestion;
      this.store.filteredSuggestions = [];
      this.selected = true;
      this.filterApartments();
    },

    submittingSearch() {
      this.submit = true;
      this.store.filteredSuggestions = [];
      this.filterApartments();
    },
  },
};
</script>

<template>
  <header
    :class="[ 
      'w-full z-50 transition-all duration-300 shadow-md fixed top-0 left-0 right-0',
      isScrolled && !isApartmentShowPage ? 'bg-teal-600 mx-auto mt-5 shadow-scroll rounded-full py-3 px-6 w-max' : 'bg-white py-4'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between px-4 md:px-8">
      <!-- Logo -->
      <div v-if="!isScrolled" class="text-teal-600 text-2xl font-bold">
        <router-link to="/">
          MilanBnB
        </router-link>
      </div>

      <!-- Barra di ricerca (Mostrata solo se NON siamo sulla pagina ApartmentShow) -->
      <div v-if="!isApartmentShowPage" class="relative w-full max-w-lg mx-auto">
        <input
          type="search"
          placeholder="Cerca appartamenti..."
          @input="getSuggestion"
          @blur="clearSuggestions"
          @keydown.enter.prevent="submittingSearch"
          v-model="store.searchInput"
          class="w-full rounded-full px-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 shadow-sm"
        />

        <!-- Icona di ricerca -->
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>

        <!-- Suggerimenti di ricerca -->
        <ul
          v-if="store.searchInput.length > 0 && store.filteredSuggestions.length > 0"
          class="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
          :class="[selected || submit ? 'hidden' : 'block']"
        >
          <li
            v-for="(suggestion, index) in store.filteredSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
            class="px-4 py-2 hover:bg-teal-100 cursor-pointer"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <!-- Pulsante di accesso (Visibile solo se non siamo in scroll e non siamo su ApartmentShow) -->
      <a
        href="http://192.168.1.101:9000/login"
        v-if="!isScrolled"
        class="ml-4 px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-md bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-100"
      >
        Accedi
      </a>

      <!-- Pulsante di accesso -->
      <!-- <router-link
        to="http://192.168.1.101:9000/login"
        v-if="!isScrolled"
        class="ml-4 px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-md bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-100"
      >
        Accedi
      </router-link> -->
    </div>
  </header>
</template>

<style scoped>
.shadow-scroll {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.315);
}
</style>
