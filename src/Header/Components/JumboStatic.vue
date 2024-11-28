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
    SearchBar
  }
}
</script>

<template>
  <div class="h-[800px] w-full relative overflow-hidden">
    <!-- SearchBar -->
    <SearchBar class="absolute top-[30%] z-20"/>
    
    <!-- Sfondo -->
    <img 
      class="object-cover object-center w-full h-full transition-all duration-500 ease-in-out" 
      :class="{ 'blur-sm': store.SearchFocus }"
      :src="store.jumboStaticImg.img" 
      alt="Immagine Jumbotron"
    >
    
    <!-- Sfumatura graduale in basso -->
    <div class="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-white to-transparent opacity-100"></div>
  </div>
</template>

<style scoped>
</style>
