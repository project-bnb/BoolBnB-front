<script>
export default {
props: {
  id: { 
    type: Number,
    required: true, 
  },
  user_id: { 
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
    return this.is_visible === true; 
  },
},
methods: {
  goToApartment() {
      this.$router.push({ name: 'apartment-show', params: { id: this.id } });
    },
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
  <div
    class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    v-if="isVisible"
    @click="goToApartment"
  >
    <img
      :src="image"
      alt="Property Image"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h2>
      <div class="flex items-center text-gray-600 text-sm mb-2">
        <span class="mr-2"><strong>Stanze:</strong> {{ rooms }}</span>
        <span class="mr-2"><strong>Letti:</strong> {{ beds }}</span>
        <span><strong>Bagni:</strong> {{ bathrooms }}</span>
      </div>
      <div class="text-gray-600 text-sm">
        <p><strong>Metri Quadri:</strong> {{ square_meters }} m²</p>
        <p><strong>Indirizzo:</strong> {{ address }}</p>
        <p><strong>Coordinate:</strong> {{ latitude }}, {{ longitude }}</p>
      </div>
    </div>
    <div class="px-4 pb-4 flex justify-between items-center">
      <!-- Edit Button -->
      <router-link :to="{ name: 'update-apartment', params: { id: id } }">
        <button class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
          Modifica
        </button>
      </router-link>

      <!-- Delete Button -->
      <button
        @click="showDeleteForm = !showDeleteForm"
        class="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
      >
        {{ showDeleteForm ? 'Annulla' : 'Cancella' }}
      </button>
    </div>
    <div
      v-if="showDeleteForm"
      class="bg-gray-50 p-4 border-t border-gray-200"
    >
      <h3 class="text-gray-700 text-lg font-semibold mb-2">
        Conferma Cancellazione
      </h3>
      <p class="text-gray-600 text-sm mb-4">
        Sei sicuro di voler cancellare l'appartamento con ID: {{ id }}?
      </p>
      <div class="flex justify-end">
        <button
          @click="deleteApartment"
          class="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Conferma
        </button>
      </div>
    </div>
  </div>
</template>
