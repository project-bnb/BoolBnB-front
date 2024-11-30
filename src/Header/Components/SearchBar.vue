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
      })
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
    getSuggestions: debounce(function () {
      if (this.store.searchInput.length > 0) {
        axios
          .get('http://127.0.0.1:8000/api/apartments')
          .then((response) => {
            const apartments = response.data.data.filter(apartment => apartment.is_visible === 1);
            const searchTerms = this.store.searchInput.toLowerCase().split(' ');

            // Filtra gli appartamenti solo per indirizzo
            let filteredApartments = apartments.filter((apartment) => {
              // Estraiamo città e via dall'indirizzo completo
              const addressParts = apartment.address.toLowerCase().split(',').map(part => part.trim());
              
              // Verifica che tutti i termini di ricerca corrispondano a parti dell'indirizzo
              return searchTerms.every(term => 
                addressParts.some(part => part.includes(term))
              );
            });

            // Ordinamento delle sponsorizzazioni: Gold, Silver, Bronze, Nessuna sponsorizzazione
            filteredApartments.sort((a, b) => {
              const priority = { Gold: 1, Silver: 2, Bronze: 3, 'No sponsorship': 4 };
              
              // Ottenere il tipo di sponsorizzazione per ogni appartamento
              const aSponsor = a.sponsorships && a.sponsorships.length > 0 ? a.sponsorships[0].name : 'No sponsorship';
              const bSponsor = b.sponsorships && b.sponsorships.length > 0 ? b.sponsorships[0].name : 'No sponsorship';
              
              // Ordinare gli appartamenti in base alla priorità di sponsorizzazione
              return priority[aSponsor] - priority[bSponsor];
            });

            // Creazione dei suggerimenti da visualizzare
            this.store.filteredSuggestions = filteredApartments
              .map((apartment) => ({
                text: apartment.address,  // Mostra solo l'indirizzo nei suggerimenti
                value: apartment.address
              }))
              .slice(0, 5);

            // Rimuovi i duplicati degli indirizzi
            this.store.filteredSuggestions = Array.from(
              new Set(this.store.filteredSuggestions.map(s => JSON.stringify(s)))
            ).map(s => JSON.parse(s));

            if (this.store.filteredSuggestions.length === 0) {
              this.store.filteredSuggestions = ['Nessun risultato trovato'];
            }
          })
          .catch((error) => {
            console.error('Errore nel recupero dei suggerimenti:', error);
          });
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

    async selectSuggestion(suggestion) {
      if (typeof suggestion === 'object') {
        this.store.searchInput = suggestion.text;
        
        try {
          const geocodingResponse = await this.tomtomAxios.get(
            `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(suggestion.text)}.json`,
            {
              params: {
                key: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7'
              }
            }
          );

          const { lat, lon } = geocodingResponse.data.results[0].position;
          
          this.$router.push({ 
            name: 'filtered-page',
            query: { 
              lat,
              lon,
              address: suggestion.text
            }
          });
        } catch (error) {
          console.error('Errore nel geocoding:', error);
        }
      }
      
      this.store.filteredSuggestions = [];
      this.selected = true;
    },

    submittingSearch() {
      this.$router.push({ name: 'filtered-page' });
      this.submit = true;
      this.store.filteredSuggestions = [];
    },

    handleFocus() {
      store.SearchFocus = true;
    },

    handleKeydown(event) {
      if (event.key === 'Enter') {
        return;
      }

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

    async handleEnter(event) {
      event.preventDefault();
      console.log('Ricerca avviata per:', this.store.searchInput); // Debug

      if (this.store.searchInput) {
        try {
          const geocodingResponse = await this.tomtomAxios.get(
            `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.store.searchInput)}.json`,
            {
              params: {
                key: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7'
              }
            }
          );

          const { lat, lon } = geocodingResponse.data.results[0].position;
          
          console.log('Coordinate trovate:', { lat, lon }); // Debug
          
          // Naviga alla pagina dei risultati
          this.$router.push({ 
            name: 'search-results',
            query: { 
              lat,
              lon,
              address: this.store.searchInput
            }
          });

        } catch (error) {
          console.error('Errore nella ricerca:', error);
        }
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
          @keydown.enter="handleEnter"
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
            {{ typeof suggestion === 'object' ? suggestion.text : suggestion }}
          </li>
        </ul>
      </div>
</template>

<style scoped>
</style>