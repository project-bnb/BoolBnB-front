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
  }
};
</script>


<template>
    <header>  
      <AppHeader/>
    </header>
    <main :class="[ !isAboutUsPage && !isApartmentShowPage  ? 'mt-[500px]' : '']">
      <AppMain/>
    </main>
    <footer :class="{'mt-[100px]' : !isAboutUsPage}">
      <AppFooter/>
    </footer>
  </template>