<script>
import Card from './AppartmentCard.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      properties: [
        {
          user_id: 1,
          title: 'Appartamento in centro',
          rooms: 3,
          beds: 2,
          bathrooms: 1,
          square_meters: 75,
          address: 'Via Roma, 1',
          latitude: 41.9028,
          longitude: 12.4964,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VtbwGeAkgKli3BC9VShiFnUN7hcdO-YKfg&s',
          is_visible: 1,
        },
      ],
    };
  },
};
</script>

<template>
    <div class="card-list">
      <Card
        v-for="property in properties"
        :key="property.user_id"
        v-bind="property"
      />
    </div>
  </template>
  

  <style scoped>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>