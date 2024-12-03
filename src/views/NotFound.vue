<script>
import axios from 'axios';

export default {
  data() {
    return {

    }
  },

  mounted(){

  },

  methods:{

    }
}

</script>

<template>
  <main class="relative grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-0 bg-cover bg-no-repeat bg-center blur-md opacity-70" 
      :style="{
        backgroundImage: 'url(public/images/Jumbo.jpg)',
      }">
    </div>
    <div class="relative text-center z-10 md:scale-90 sm:scale-75">
      <p class="text-4xl drop-shadow-lg font-semibold text-[#B49578]">404</p>
      <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-5xl">
        Pagina non trovata
      </h1>
      <p class="mt-6 text-pretty drop-shadow-lg text-lg font-medium text-white sm:text-xl/8">
        Ci dispiace, non abbiamo trovato la pagina che stavi cercando.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-[#B49578] px-3.5 py-2.5 text-sm transition-all ease-in-out duration-300 font-semibold text-white shadow-sm hover:text-[#B49578] hover:bg-white sm:w-8/12"
        >
          Torna alla Home
        </router-link>
        <router-link
          to="/about"
          class="rounded-full py-3 px-6 transition-all ease-in-out duration-300 text-sm font-semibold text-[#B49578] bg-white shadow-sm hover:bg-[#B49578] hover:text-white sm:w-8/12"
        >
          Contatta il Servizio Clienti
        </router-link>
      </div>
    </div>
  </main>
</template>


<style scoped>

</style>
