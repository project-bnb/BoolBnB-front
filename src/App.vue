<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
import AppHeader from './Header/AppHeader.vue';
import axios from 'axios';

export default {
  components: {
    AppHeader,
  },
  mounted() {
    axios.get('http://192.168.1.101:9000/api/users')
    .then((res) => {
      console.log(res);
      })
      .catch((error) => console.error('Errore:', error));
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