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
  <div class="flex flex-wrap justify-center">
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
      :is_visible="property.is_visible"
      @apartmentDeleted="removeApartment"
    />
  </div>
</template>
