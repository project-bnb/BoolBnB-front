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
      }
    }
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
        .get('http://127.0.0.1:8000/api/apartments')
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
            .slice(0, 5);

          if (this.store.filteredSuggestions.length === 0) {
            this.store.filteredSuggestions = ['Nessun risultato trovato'];
          }

          this.selectedIndex = -1;
        })
        .catch((error) => {
          console.error('Errore nel recupero dei suggerimenti:', error);
        });
    }, 300),

    clearSuggestions() {
        store.SearchFocus = false;
      setTimeout(() => {
        this.store.filteredSuggestions = [];
        this.selectedIndex = -1;
      }, 200);
    },

    selectSuggestion(suggestion) {
      this.$router.push({ name: 'filtered-page' });
      this.store.searchInput = suggestion;
      this.store.filteredSuggestions = [];
      this.selected = true;
      this.filterApartments();
    },

    submittingSearch() {
      this.$router.push({ name: 'filtered-page' });
      this.submit = true;
      this.store.filteredSuggestions = [];
      this.filterApartments();
    },

    handleFocus() {
      store.SearchFocus = true;
    },

    handleKeydown(event) {
      if (this.store.filteredSuggestions.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          if (this.selectedIndex < this.store.filteredSuggestions.length - 1) {
            this.selectedIndex++;
          }
          event.preventDefault();
          break;

        case 'ArrowUp':
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
          }
          event.preventDefault();
          break;

        case 'Enter':
          if (this.selectedIndex >= 0) {
            this.selectSuggestion(this.store.filteredSuggestions[this.selectedIndex]);
          }
          event.preventDefault();
          break;

        default:
          break;
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
          placeholder="Inserisci indirizzo..."
          @input="getSuggestion"
          @blur="clearSuggestions"
          @keydown="handleKeydown"
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
          v-if="store.searchInput.length > 0 && store.filteredSuggestions.length > 0"
          class="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          :class="[selected || submit ? 'hidden' : 'block']"
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
