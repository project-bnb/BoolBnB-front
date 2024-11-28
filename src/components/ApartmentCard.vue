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
    services: {
      type: Array,
      required: true,
    },
    sponsorships: {
      type: Array,
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
      </div>
      <div class="text-gray-600 text-sm">
        <p><strong>Servizi: </strong> 
          <span v-for="(service, index) in services" :key="index">
            {{ service.name }}<span v-if="index < services.length - 1"> | </span>
          </span>
        </p>
      </div>

      <span class="text-gray-600 text-sm" v-if="sponsorships.length > 0">
        <strong>Sponsorizzato: </strong>
        <span v-for="(sponsor, index) in sponsorships" :key="index"> {{ sponsor.name }}<span v-if="index < sponsorships.length - 1"> | </span></span>
      </span>

      <div class="mt-4 flex justify-between">
    </div>
    </div>
  </div>
</template>