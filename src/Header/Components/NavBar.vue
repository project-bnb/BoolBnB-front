<script>
import { store } from '../../store';

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
    handleScroll() {
      if (this.isApartmentShowPage) {
        return;
      }
      this.isScrolled = window.scrollY > 50;
    },
  },
};
</script>

<template>
  <header
    class= 'w-full z-50 transition-all duration-300 shadow-nav fixed top-0 left-0 right-0 bg-[#097A88] py-4'>
    <div class="container mx-auto flex items-center justify-between px-4 md:px-8">

      <!-- Logo -->
      <div class="text-white text-2xl font-bold">
        <router-link to="/" class="text-white transition-all ease-in-out duration-300 hover:text-gray-200">
          MilanBnB
        </router-link>
      </div>

      <!-- Pulsante di accesso -->
      <a
        href="http://127.0.0.1:8000/login"
        class="ml-4 px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-md bg-white text-[#097A88] hover:bg-gray-200"
      >
        Accedi
      </a>
    </div>
  </header>
</template>

<style scoped>
.shadow-nav{
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.315);
}

.shadow-scroll {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.315);
}
</style>
