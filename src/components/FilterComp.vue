<script>
export default {
  data() {
    return {
      isExpanded: false, 
      hovering: false
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    TurnUp(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  },
};
</script>

<template>
<div class="relative">
    <div class="fixed w-14 h-14 z-50">
      <!-- Pulsante -->
      <button
        ref="bounceButton"
        @click="toggleExpand"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        class="w-14 h-14 ml-4 bg-teal-600 z-50 text-white fixed left-0 top-1/6 rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'bg-white hover:bg-gray-100 translate-x-2' : 'hover:bg-teal-700 hover:translate-x-2']"
      >
        <i class="fa-solid fa-wand-magic-sparkles"
           :class="[isExpanded ? 'text-teal-600' : '']">
        </i>
      </button>
      <span
        class="absolute z-10 top-[2px] left-[50px] transform translate-y-1/2 font-bold transition-all duration-500 ease-in-out"
        :class="[
          isExpanded ? 'text-white translate-x-11' : (hovering ? 'translate-x-11 text-teal-700' : 'text-white -translate-x-11')
        ]"
      >
        Filtri
      </span>
    </div>

    <!-- Page Filter che si espande sotto al pulsante -->
    <transition name="expand">
      <div 
      :class="[ 
        isExpanded ? 'z-0 fixed left-[0] top-[0] h-screen w-[11%] bg-teal-600 filter-bar shadow-md transition-all duration-{3000}ease-in-out' : 'transition-all duration-{3000} ease-in-out rounded-full h-0 w-0 fixed left-[16px] top-[100px]'
      ]">
        <div v-if="isExpanded" class="grid">
          <div
          @click="TurnUp"
          class="text-white text-2xl font-bold justify-self-center mt-4 cursor-pointer">
            MilanBnb
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>
