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
      selectedIndex: -1,
      tomtomAxios: axios.create({
        withCredentials: false
      }),
      apiTomTomKey: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7'
    };
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.isAuthenticated = !!localStorage.getItem('AuthToken');
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  watch: {
    $route(to) {
      if (to.name === 'home') {
        this.store.searchInput = '';
      } else if (to.name === 'filtered-page' && to.query.noResults === 'true') {
        this.store.searchInput = 'Risultato non trovato';
        // Dopo 2 secondi, ripristina l'input originale
        setTimeout(() => {
          this.store.searchInput = to.query.address || '';
        }, 2000);
      }
    }
  },

  computed: {
    isApartmentShowPage() {
      return this.$route.name === 'apartment-show';
    },
  },

  methods: {
    getSuggestions: debounce(function () {
      // se la lunghezza della stringa è maggiore di 0
      if (this.store.searchInput.length > 0) {
        // se la lunghezza della stringa è minore di 2
        if (this.store.searchInput.length < 2) {
          this.store.filteredSuggestions = [];
          return;
        } else {
          // modifica sul bounding box per evitare di ottenere suggerimenti di città esterne ora prende posizione lombardia
          const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.store.searchInput)}.json?key=${this.apiTomTomKey}&limit=5&countrySet=IT&language=it-IT&boundingBox=35.5,6.7,47.1,18.5`;
          this.tomtomAxios
          .get(url)
          .then((response) => {
            // definisco data che puo essere vuota o con i suggerimenti
            const data = response.data.results || [];

            // mappa i suggerimenti / array di stringhe nuovo
            this.store.filteredSuggestions = data.map(item => item.address.freeformAddress);

            // se non ci sono suggerimenti
            if (this.store.filteredSuggestions.length === 0) {
              this.store.filteredSuggestions = ['Nessun risultato trovato'];
            }
          })
          .catch((error) => {
            console.error('Errore nel recupero dei suggerimenti:', error);
          });
        }
      } else {
        this.store.filteredSuggestions = [];
      }
    }, 300),

    clearSuggestions() {
      store.SearchFocus = false;
      setTimeout(() => {
        this.store.filteredSuggestions = [];
        this.selectedIndex = -1;
      }, 200);
    },

    /**
     * seleziona il suggerimento
     */
    async selectSuggestion(suggestion) {
      if (typeof suggestion === 'string') {
        this.store.searchInput = suggestion;
        await this.navigateToFilteredPage(suggestion);
      }
      this.store.filteredSuggestions = [];
      this.selected = true;
    },

    submittingSearch() {
      // se non siamo già nella pagina 'filtered-page', naviga verso di essa
      if (this.$route.name !== 'filtered-page') {
        this.$router.push({
          name: 'filtered-page',
          query: {
            lat: 45.4642,
            lon: 9.1900,
            radius: 20,
            address: 'Milano',
          }
        });
      }
      this.submit = true;
      this.store.filteredSuggestions = [];
    },

    handleFocus() {
      store.SearchFocus = true;
    },

    handleKeydown(event) {
      if (!this.store.filteredSuggestions || this.store.filteredSuggestions.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (this.selectedIndex < this.store.filteredSuggestions.length - 1) {
            this.selectedIndex++;
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
          }
          break;
      }
    },

    handleEnter() {
      // Se siamo già nella pagina filtered, applichiamo solo i filtri
      if (this.$route.name === 'filtered-page') {
        // Invece di cercare direttamente il componente, usiamo lo store
        store.triggerFilter = true;
      } else {
        if (this.store.searchInput) {
          this.navigateToFilteredPage(this.store.searchInput);
        } else {
          this.$router.push({
            name: 'filtered-page',
            query: {
              lat: 45.4642,
              lon: 9.1900,
              radius: 20,
              address: 'Milano',
              shouldFilter: 'true'
            }
          });
          this.store.filteredSuggestions = [];
        }
      }
    },

    async navigateToFilteredPage(address) {
      try {
        const geocodingResponse = await this.tomtomAxios.get(
          `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`,
          {
            params: {
              key: this.apiTomTomKey
            }
          }
        );

        let lat, lon;
        let noResults = false;
        
        if (geocodingResponse.data.results && geocodingResponse.data.results.length > 0) {
          const { position } = geocodingResponse.data.results[0];
          lat = position.lat;
          lon = position.lon;
        } else {
          lat = 45.4642;
          lon = 9.1900;
          noResults = true;
        }

        await this.$router.push({
          name: 'filtered-page',
          query: {
            lat,
            lon,
            radius: 20,
            address: this.store.searchInput,
            noResults: noResults ? 'true' : undefined,
            shouldFilter: 'true'
          }
        });

        this.store.filteredSuggestions = [];

      } catch (error) {
        console.error('Errore nel geocoding:', error);
        await this.$router.push({
          name: 'filtered-page',
          query: {
            lat: 45.4642,
            lon: 9.1900,
            radius: 20,
            address: this.store.searchInput,
            noResults: 'true',
            shouldFilter: 'true'
          }
        });
        
        this.store.filteredSuggestions = [];
      }
    }
  }
}
</script>


<template>
    <!-- Barra di ricerca -->
    <div v-if="!isApartmentShowPage" class="relative scale-125 max-w-lg mx-auto">
        <input
          type="search"
          placeholder="Cerca per città o indirizzo..."
          @input="getSuggestions"
          @blur="clearSuggestions"
          @keydown="handleKeydown"
          @keyup.enter.prevent="handleEnter"
          @focus="handleFocus"
          v-model="store.searchInput"
          class="w-full rounded-full px-12 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B49578] transition duration-200 shadow-sm text-gray-700"
        />

        <!-- Icona di ricerca -->
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>

        <!-- Suggerimenti di ricerca -->
        <ul
          v-if="store.searchInput && store.filteredSuggestions && store.filteredSuggestions.length > 0"
          class="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <li
            v-for="(suggestion, index) in store.filteredSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
            class="px-4 py-2 hover:bg-[#B49578] hover:text-white cursor-pointer"
            :class="{ 'bg-[#B49578] text-white': index === selectedIndex }"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
</template>

<style scoped>
</style>
