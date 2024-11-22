<script>
import ApartmentCard from './ApartmentCard.vue';

export default {
  components: {
    ApartmentCard,
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
        .then(data => {
          this.apartments = data;
          console.log(this.apartments);
        })
        .catch(error => console.error('Errore:', error));
    }
  },
};
</script>

<template>
    <div class="flex flex-wrap justify-center">
      <ApartmentCard
        v-for="property in apartments"
        :key="property.id"
        v-bind="property"
      />
    </div>
  </template>
