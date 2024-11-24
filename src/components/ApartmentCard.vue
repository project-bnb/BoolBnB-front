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
      showDeleteModal: false,
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
  },
};
</script>

<template>
  <div
    class="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
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
      <div class="mt-4 flex justify-between">
        <router-link :to="{ name: 'update-apartment', params: { id } }" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" @click.stop>
          Modifica
        </router-link>
        <router-link :to="{ name: 'confirm-delete', params: { id } }" class="bg-red-500 text-white px-4 py-2 rounded" @click.stop>
          Cancella
        </router-link>
      </div>
    </div>
  </div>
</template>