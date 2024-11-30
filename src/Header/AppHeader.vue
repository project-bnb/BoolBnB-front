<script>
import JumboStatic from './Components/JumboStatic.vue';
import NavBar from './Components/NavBar.vue';

export default {
  data() {
    return { 
    
    }
  },
  components: {
    NavBar,
    JumboStatic
  },
  methods: {

  }
}
</script>

<template>
  <div>
    <NavBar/>
  </div>
  <div class="absolute top-[68px] left-0 right-0">
    <JumboStatic />
  </div>
</template>

<style scoped>

</style>