<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    handleRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<template>
  <div class="w-full py-16">
    <!-- Contenitore del top footer -->
    <div class="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 space-y-6 md:space-y-0">
      <!-- Sezione di Testo -->
      <div class="text-center md:text-left">
        <h2 class="font-bold text-2xl drop-shadow-md text-white mb-2">
          Vuoi inserire i tuoi appartamenti?
        </h2>
        <p class="text-md text-white drop-shadow-md	">
          Registrati o fai l'accesso per iniziare subito a condividere i tuoi spazi con gli altri!
        </p>
      </div>
      <!-- Pulsante di Azione -->
      <button
        @click="handleRegister"
        class="px-6 py-3 rounded-full bg-white text-[#B49578] font-semibold shadow-lg transition-all duration-300 ease-in-out hover:bg-[#B49578] hover:text-white hover:shadow-lg hover:-translate-y-1"
      >
        Inizia Ora
      </button>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  transform: translateY(-3px);
}
</style>
