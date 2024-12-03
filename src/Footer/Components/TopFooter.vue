<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {

  },
};
</script>

<template>
  <div class="w-full py-16">
    <!-- Contenitore del top footer -->
    <div class="flex flex-col md:flex-row sm:flex-wrap sm:gap-9 sm:justify-center items-center justify-between max-w-6xl mx-auto px-6 space-y-6 md:space-y-0">
      <!-- Sezione di Testo -->
      <div class="text-center md:text-left">
        <h2 class="font-bold text-2xl md:text-center drop-shadow-md text-white mb-2">
          Vuoi inserire i tuoi appartamenti?
        </h2>
        <p class="text-md text-white drop-shadow-md	sm:text-center sm:mt-6">
          Registrati o fai l'accesso per iniziare subito a condividere i tuoi spazi con gli altri!
        </p>
      </div>
      <!-- Pulsante di Azione -->
      <a href="http://127.0.0.1:8000/register">
        <button
          class="px-6 py-3 rounded-full bg-white text-[#B49578] font-semibold shadow-lg transition-all duration-300 ease-in-out hover:bg-[#B49578] hover:text-white hover:shadow-lg hover:-translate-y-1"
        >
          Inizia Ora
        </button>
      </a>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  transform: translateY(-3px);
}
</style>
