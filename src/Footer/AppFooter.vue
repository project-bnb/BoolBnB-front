<script>
import TopFooter from './Components/TopFooter.vue';
import BottFooter from './Components/BottFooter.vue';

export default {
  data() {
    return { 

    }
  },
  components: {
    TopFooter,
    BottFooter
  },

  computed:{
    isApartmentShowPage() {
      return this.$route.name === 'apartment-show';
    },
  },

  methods: {

  }
}
</script>

<template>
  <div 
    class="bg-gradient-to-b from-[#BDAFA2] to-[#B49578]"
    :class="[isApartmentShowPage ? 'mt-[800px]' : '' ]"
  >
    <div>
      <TopFooter/>
    </div>
    <div>
      <BottFooter/>
    </div>
  </div>
</template>

<style scoped>

</style>