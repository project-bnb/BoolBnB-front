<script>
import { store } from '../../store.js';
import SearchBar from './SearchBar.vue';

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    SearchBar,
  },
  computed: {
    isApartmentShowPage() {
      return this.$route.name === 'apartment-show';
    },
    isFilteredPage() {
      return this.$route.name === 'filtered-page';
    },
    isAboutUsPage() {
      return this.$route.name === 'AboutUs';
    },
    isNotFound() {
      return this.$route.name === 'not-found';
    },
  },
};
</script>

<template>
  <div v-if="!isAboutUsPage && !isNotFound" class="h-[800px] w-full relative overflow-hidden">
    <!-- Sfondo -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0 w-full h-[full] bg-cover bg-center transition-all duration-500 ease-in-out"
      :style="{ 
        backgroundImage: `url('/images/Jumbo.jpg')`, 
        backgroundPosition: '50% 40%' 
      }"
      :class="{ 'blur-sm': store.SearchFocus || isApartmentShowPage || isFilteredPage }"
    ></div>

    <!-- SearchBar -->
    <SearchBar class="absolute top-[25%] z-20 sm:scale-90 sm:w-[330px] md:w-[370px]" />

    <!-- Sfumatura graduale in basso -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent opacity-100"
    ></div>
  </div>
</template>

<style scoped>
</style>
