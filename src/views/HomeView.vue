<script>
import ApartmentList from '../components/ApartmentList.vue';
import Main from '../Main/Components/Main.vue';

export default {
  data() {
    return {
      
    };
  },
  components: {
    ApartmentList,
    Main,
  }
}
</script>

<template>
  <div>
    <ApartmentList class="-translate-y-[290px]"/>
  </div>
  <div>
    <Main/>
  </div>
</template>
<style scoped>

</style>
