<script>
import Card from './AppartmentCard.vue';

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
        .then(data => {
          this.apartments = data;
        })
        .catch(error => console.error('Errore:', error));
    }
  },
};
</script>

<template>
    <div class="flex flex-wrap justify-center">
      <Card
        v-for="property in apartments"
        :key="property.id"
        v-bind="property"
      />
    </div>
  </template>
