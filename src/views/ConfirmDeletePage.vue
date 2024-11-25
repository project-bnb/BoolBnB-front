<template>
    <div class="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-4">Conferma Cancellazione</h1>
      <p class="text-center mb-6">Sei sicuro di voler eliminare l'appartamento con ID: {{ apartmentId }}?</p>
      <div class="flex justify-center">
        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" @click="cancel">Annulla</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded" @click="confirmDelete">Cancella</button>
      </div>
      <p v-if="message" class="mt-4 text-red-500 text-center">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        apartmentId: this.$route.params.id,
        message: '',
      };
    },
    methods: {
      cancel() {
        this.$router.push({ name: 'apartment-list' });
      },
      confirmDelete() {
        axios
          .delete(`http://192.168.1.101:9000/api/apartments/${this.apartmentId}`)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: 'apartment-list' }); 
              alert('Appartamento cancellato con successo!');
            } else {
              this.message = 'Errore nella cancellazione dell\'appartamento.';
            }
          })
          .catch((error) => {
            console.error('Errore:', error);
            this.message = 'Si è verificato un errore nella richiesta.';
          });
      },
    },
  };
  </script>