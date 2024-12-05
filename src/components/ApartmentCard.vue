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
    is_visible: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  components: {

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
    class="w-full mx-auto bg-[#BDAFA2] shadow-ap-card rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    v-if="isVisible"
    @click="goToApartment"
  >
    <img
      :src="image"
      alt="Property Image"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h2 class="text-2xl font-bold text-[#EDEEF0] mb-2">{{ title }}</h2>
      <div class="flex items-center text-[#EDEEF0] text-sm mb-2">
        <span class="mr-2"><strong>Stanze:</strong> {{ rooms }}</span>
        <span class="mr-2"><strong>Letti:</strong> {{ beds }}</span>
        <span><strong>Bagni:</strong> {{ bathrooms }}</span>
      </div>
      <div class="text-[#EDEEF0] text-sm">
        <p><strong>Metri Quadri:</strong> {{ square_meters }} m²</p>
        <p><strong>Indirizzo:</strong> {{ address }}</p>
      </div>
      <div class="text-[#EDEEF0] text-sm mt-2">
        <p><strong>Servizi: </strong> 
          <span v-for="(service, index) in services" :key="index">
            {{ service.name }}<span v-if="index < services.length - 1"> | </span>
          </span>
        </p>
      </div>
      <div class="text-[#EDEEF0] text-lg font-bold mt-4">
        <p><strong>Prezzo:</strong> {{ price }} €</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-ap-card {
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.459);
}

.bg-apartment-card {
  background-color: #BDAFA2;
}
</style>
