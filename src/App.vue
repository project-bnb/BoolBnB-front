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
};
</script>

<template>
    <header>  
      <AppHeader/>
    </header>
    <main>
      <AppMain/>
    </main>
    <footer>
      <AppFooter/>
    </footer>
  </template>