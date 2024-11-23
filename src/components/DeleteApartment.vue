<script>
export default {
  data() {
    return {
      apartmentId: null, 
      message: '', 
    };
  },
  methods: {
    deleteApartment() {
      fetch(`http://127.0.0.1:8000/api/apartments/${this.apartmentId}`, {
        method: 'DELETE', 
      })
        .then(response => {
          if (response.ok) {
            this.message = 'Appartamento cancellato con successo!';
            this.$emit('apartmentDeleted', this.apartmentId); 
          } else {
            return response.json().then(err => {
              this.message = `Errore nella cancellazione: ${err.message}`;
            });
          }
        })
        .catch(error => {
          console.error('Errore:', error);
          this.message = 'Si è verificato un errore nella richiesta.';
        });
    },
  },
};
</script>

<template>
    <div>
      <h2 class="text-lg font-bold">Cancellazione Appartamento</h2>
      <form @submit.prevent="deleteApartment">
        <label for="apartmentId" class="block mb-2">ID Appartamento:</label>
        <input
          type="number"
          v-model="apartmentId"
          id="apartmentId"
          required
          class="border border-gray-300 rounded p-2 mb-4"
        />
        <button type="submit" class="bg-red-500 text-white rounded p-2">Cancella Appartamento</button>
      </form>
      <p v-if="message" class="mt-4">{{ message }}</p>
    </div>
  </template>
  
 