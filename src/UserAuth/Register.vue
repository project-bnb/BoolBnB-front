<script>
export default {
  data() {
    return {
      name: '',
      cognome: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate:'',
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Le password non coincidono');
        return;
      }
    },
  },
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crea un Nuovo Account</h2>

      <form @submit.prevent="handleRegister">
        <!-- Campo Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Campo Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password <span class="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Campo Nome -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Campo Cognome -->
        <div class="mb-4">
          <label for="surname" class="block text-sm font-medium text-gray-700">
            Cognome
          </label>
          <input
            type="text"
            id="surname"
            v-model="surname"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Campo Data di Nascita -->
        <div class="mb-6">
          <label for="birthDate" class="block text-sm font-medium text-gray-700">
            Data di Nascita
          </label>
          <input
            type="date"
            id="birthDate"
            v-model="birthDate"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Bottone di Registrazione -->
        <button
          type="submit"
          class="w-full bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
        >
          Registrati
        </button>
      </form>

      <!-- Link per il Login -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Hai già un account?
        <router-link to="/login" class="text-teal-600 hover:text-teal-800 font-semibold">
          Accedi
        </router-link>
      </p>

      <!-- Nota per i Campi Obbligatori -->
      <p class="mt-4 text-center text-sm text-gray-500 italic">
        Sono contrassegnati con <span class="text-red-500">*</span> i dati obbligatori.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Stile opzionale per migliorare l'aspetto */
</style>
