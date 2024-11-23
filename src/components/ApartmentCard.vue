<script>
export default {
props: {
  id: { 
    type: Number,
    required: true, 
  },
  title: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  square_meters: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  is_visible: {
    type: Boolean,
    required: true,
  },
},
data() {
  return {
    showDeleteForm: false, 
  };
},
computed: {
  isVisible() {
    return this.is_visible === 1; 
  },
},
methods: {
  deleteApartment() {
    fetch(`http://127.0.0.1:8000/api/apartments/${this.id}`, { 
      method: 'DELETE', 
    })
    .then(response => {
      if (response.ok) {
        alert('Appartamento cancellato con successo!');
        this.$emit('apartmentDeleted', this.id); 
      } else {
        alert('Errore nella cancellazione dell\'appartamento.');
      }
    })
    .catch(error => {
      console.error('Errore:', error);
      alert('Si è verificato un errore nella richiesta.');
    });
  },
},
};
</script>

<template>
  <div class="border border-gray-300 rounded-lg p-4 m-4 flex flex-col items-center" v-if="isVisible">
    <img :src="image" alt="Property Image" class="max-w-full rounded-lg" />
    <div class="text-center">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <p><strong>Rooms:</strong> {{ rooms }}</p>
      <p><strong>Beds:</strong> {{ beds }}</p>
      <p><strong>Bathrooms:</strong> {{ bathrooms }}</p>
      <p><strong>Square Meters:</strong> {{ square_meters }}</p>
      <p><strong>Address:</strong> {{ address }}</p>
      <p><strong>Coordinates:</strong> {{ latitude }}, {{ longitude }}</p>
      
      <!-- Pulsante per cancellare l'appartamento -->
      <button @click="showDeleteForm = !showDeleteForm" class="bg-red-500 text-white rounded p-2 mt-4">
        {{ showDeleteForm ? 'Annulla' : 'Cancella Appartamento' }}
      </button>

      <!-- Modulo di cancellazione -->
      <div v-if="showDeleteForm" class="mt-4">
        <h3 class="text-md font-semibold">Conferma Cancellazione</h3>
        <form @submit.prevent="deleteApartment">
          <p>Sei sicuro di voler cancellare l'appartamento con ID: {{ id }}?</p>
          <button type="submit" class="bg-red-500 text-white rounded p-2">Conferma Cancellazione</button>
        </form>
      </div>
    </div>
  </div>
</template>

