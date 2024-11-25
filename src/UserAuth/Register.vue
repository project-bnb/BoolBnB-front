<script>
import axios from 'axios';

export default {
  data() {
    return {
      formRegister: {
        name: 'asd',
        surname: 'asd',
        email: 'dimasdah11009@gmail.com',
        password: 'Sonofico123',
        confirmPassword: 'Sonofico123',
        birth_date:'2024-11-24',
      }
    };
  },
  methods: {
    logout(){
      axios
        .post('http://192.168.1.101:9000/logout')
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert('Non sei autorizzato a disconnetterti.');
          } else {
            alert('Si è verificato un errore durante il logout.');
          }
        });
    },
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Le password non coincidono');
        return;
      }

      console.log(this.formRegister);
      
      axios
          .post('http://192.168.1.101:9000/register', this.formRegister)
          .then((res) => {

            console.log(res);
            console.log(res.data);
            this.formRegister = {
              name: '',
              cognome: '',
              email: '',
              password: '',
              confirmPassword: '',
              birth_date: '',
            }
          })
          .catch((err) => {
            alert('Si è verificato un errore durante la registrazione');
			});

    },
  },
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crea un Nuovo Account</h2>

      <form @submit.prevent="handleRegister">

        <!-- Campo Nome -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="name"
            v-model="formRegister.name"
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
            v-model="formRegister.surname"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        
        <!-- Campo Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="formRegister.email"
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
          v-model="formRegister.password"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <!-- Campo Conferma Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Conferma Password <span class="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formRegister.confirmPassword"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>


        <!-- Campo Data di Nascita -->
        <div class="mb-6">
          <label for="birth_date" class="block text-sm font-medium text-gray-700">
            Data di Nascita
          </label>
          <input
            type="date"
            id="birth_date"
            v-model="formRegister.birth_date"
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
      <button @click="logout">bottone</button>

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
