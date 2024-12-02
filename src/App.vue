<script>
import AppHeader from './Header/AppHeader.vue';
import AppMain from './Main/AppMain.vue';
import AppFooter from './Footer/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  computed: {
    isApartmentShowPage() {
      return this.$route.name === 'apartment-show';
    },

    isAboutUsPage() {
      return this.$route.name === 'AboutUs';
    },

    isNotFound() {
      return this.$route.name === 'not-found';
    },
  }
};
</script>


<template>
    <header>  
      <AppHeader/>
    </header>
    <main :class="[ !isAboutUsPage && !isApartmentShowPage && !isNotFound  ? 'mt-[500px] mb-[250px]' : '']">
      <AppMain/>
    </main>
    <footer>
      <AppFooter/>
    </footer>
  </template>