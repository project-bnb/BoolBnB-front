<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Logica per il login
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        // Puoi aggiungere qui la logica per inviare i dati del form a un API
      },
    },
  };
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Accedi al tuo account</h2>
  
        <form @submit.prevent="handleLogin">
          <!-- Campo Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
  
          <!-- Campo Password -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
  
          <!-- Bottone di Accesso -->
          <button
            type="submit"
            class="w-full bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Accedi
          </button>
        </form>
  
        <!-- Link per Registrarsi -->
        <p class="mt-6 text-center text-sm text-gray-600">
          Non hai un account?
          <router-link to="/register" class="text-teal-600 hover:text-teal-800 font-semibold">
            Registrati
          </router-link>
        </p>
      </div>
    </div>
</template>

<style scoped>

</style>
  