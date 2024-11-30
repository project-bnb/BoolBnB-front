<script>
import ApartmentList from '../components/ApartmentList.vue';
import Main from '../Main/Components/Main.vue';
import JumboStatic from '../Header/Components/JumboStatic.vue';

export default {
  data() {
    return {
      
    };
  },
  components: {
    ApartmentList,
    Main,
    JumboStatic,
  }
}
</script>

<template>
  <JumboStatic />
  <div>
    <ApartmentList/>
  </div>
</template>
<style scoped>

</style>
