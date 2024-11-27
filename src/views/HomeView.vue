<script>
import ApartmentList from '../components/ApartmentList.vue';
import FilterComp from '../components/FilterComp.vue';
// import Jumbotron from '../Header/Components/Jumbotron.vue';
import Main from '../Main/Components/Main.vue';

export default {
  data() {
    return {
      
    };
  },
  components: {
    ApartmentList,
    // Jumbotron,
    Main,
    FilterComp
  }
}
</script>

<template>
  <div>
    <FilterComp/>
    <ApartmentList/>
  </div>
  <div>
    <!-- <Jumbotron/> -->
  </div>
  <div>
    <Main/>
  </div>
</template>
<style scoped>

</style>
