<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
import AppHeader from './header/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
  methods: {

  }
}
</script>

<template>
  <div>
    <!-- 3) Utilizzo del componente -->
    <AppHeader />
    <router-view></router-view>
    <main>
      
    </main>
  </div>
</template>

<style scoped>
main {
  text-align: center;
}
</style>