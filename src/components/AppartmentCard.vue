<script>
  export default {
    props: {
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
    computed: {
      isVisible() {
        return this.is_visible === 1; 
      },
    },
  };
  </script>
  
<template>
    <div class="card" v-if="isVisible">
      <img :src="image" alt="Property Image" class="card-image" />
      <div class="card-content">
        <h2>{{ title }}</h2>
        <p><strong>Rooms:</strong> {{ rooms }}</p>
        <p><strong>Beds:</strong> {{ beds }}</p>
        <p><strong>Bathrooms:</strong> {{ bathrooms }}</p>
        <p><strong>Square Meters:</strong> {{ square_meters }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
        <p><strong>Coordinates:</strong> {{ latitude }}, {{ longitude }}</p>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-image {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .card-content {
    text-align: center;
  }
  </style>