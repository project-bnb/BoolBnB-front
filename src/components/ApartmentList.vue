<script>
import Card from './ApartmentCard.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      apartments: [],
    };
  },
  mounted() {
    this.fetchApartments();
  },
  methods: {
    fetchApartments() {
      fetch('http://127.0.0.1:8000/api/apartments')
        .then(response => response.json())
        .then(res => {
          this.apartments = res.data;
        })
        .catch(error => console.error('Errore:', error));
    },
    removeApartment(id) {
      this.apartments = this.apartments.filter(apartment => apartment.id !== id); 
    }
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Lista Appartamenti</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card
        v-for="property in apartments"
      :key="property.id"
      :id="property.id" 
      :user_id="property.user_id"
      :title="property.title"
      :rooms="property.rooms"
      :beds="property.beds"
      :bathrooms="property.bathrooms"
      :square_meters="property.square_meters"
      :address="property.address"
      :latitude="property.latitude"
      :longitude="property.longitude"
      :image="property.image"
      :is_visible="Boolean(property.is_visible)"
      @apartmentDeleted="removeApartment"
      />
    </div>
    <div v-if="apartments.length === 0" class="text-center mt-12">
      <p class="text-gray-500 text-lg">Nessun appartamento disponibile.</p>
    </div>
  </div>
</template>
