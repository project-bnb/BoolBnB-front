<script>
import ApartmentList from '../components/ApartmentList.vue';
import JumboStatic from '../Header/Components/JumboStatic.vue';
import Main from '../Main/Components/Main.vue';

export default {
  data() {
    return {
      
    };
  },
  components: {
    ApartmentList,
    JumboStatic,
    Main,
  }
}
</script>

<template>
  <div>
    <JumboStatic/>
  </div>
  <div>
    <ApartmentList/>
  </div>
  <div>
    <Main/>
  </div>
</template>
<style scoped>

</style>
