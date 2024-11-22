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
    <div class="border border-gray-300 rounded-lg p-4 m-4 flex flex-col items-center" v-if="isVisible">
      <img :src="image" alt="Property Image" class="max-w-full rounded-lg" />
      <div class="text-center">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <p><strong>Rooms:</strong> {{ rooms }}</p>
        <p><strong>Beds:</strong> {{ beds }}</p>
        <p><strong>Bathrooms:</strong> {{ bathrooms }}</p>
        <p><strong>Square Meters:</strong> {{ square_meters }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
        <p><strong>Coordinates:</strong> {{ latitude }}, {{ longitude }}</p>
      </div>
    </div>
  </template>

