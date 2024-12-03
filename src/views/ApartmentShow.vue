<script>
import axios from 'axios';
import ContactForm from '../components/ContactForm.vue';

export default {
  data() {
    return {
      apartment: {},
      selectedImage: 0,
    };
  },
  components: {
    ContactForm
  },
  mounted() {
    this.getApartment();
  },
  methods: {
    initMap() {
      const tt = window.tt;
      const latitude = parseFloat(this.apartment.latitude);
      const longitude = parseFloat(this.apartment.longitude);

      const map = tt.map({
        key: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7',
        container: 'map',
        center: [longitude, latitude], 
        zoom: 14
      });

      new tt.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    },
    getApartment() {
      const apartmentId = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`)
        .then((res) => {
          this.apartment = res.data.data;
          console.log('Appartamento:', this.apartment);
          this.initMap();
          if (this.apartment.images && this.apartment.images.length > 0) {
            this.selectedImage = this.apartment.images[0];
          }
        })
        .catch((err) => {
          console.error('Errore:', err);
          this.$router.push({ name: 'not-found' });
        });
    },
    enlargeImage(image) {
      this.selectedImage = image;
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg relative sm:grid-cols-1 mt-28 grid sm:gap-5 grid-cols-2 gap-10">
    <!-- Immagini con possibilità di selezione -->
    <div class="flex flex-col space-y-4 sm:contents">
      <div class="w-full sm:mb-0 sm:col-span-2 h-80 mb-4">
        <!-- Immagine Selezionata Grande -->
        <img :src="selectedImage ? selectedImage.image_path : (apartment.images && apartment.images.length > 0 ? apartment.images[0].image_path : '')" 
             alt="Selected Apartment Image" 
             class="w-full h-full object-cover rounded-lg shadow-md">
      </div>
      <div class="flex flex-cols-4 gap-4 flex-wrap justify-center sm:col-span-2">
        <!-- Thumbnail delle Immagini -->
        <img v-for="(image, index) in apartment.images" 
             :key="index" 
             :src="image.image_path" 
             alt="Apartment Image Thumbnail" 
             class="w-[130px] h-20 object-cover rounded-lg cursor-pointer border-2"
             :class="{ 'border-[#BBA796] shadow-pre': selectedImage && selectedImage.image_path === image.image_path, 'border-transparent': !selectedImage || selectedImage.image_path !== image.image_path }"
             @click="enlargeImage(image)" />
      </div>
    </div>
    
    <!-- Dettagli dell'Appartamento -->
    <div class="flex flex-col space-y-6">
      <h1 class="text-3xl font-extrabold text-gray-800">{{ apartment.title }}</h1>
      <p class="text-lg text-gray-600">{{ apartment.description }}</p>
      
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Dettagli</h2>
        <ul class="space-y-2">
          <li class="text-gray-700"><strong>Stanze:</strong> {{ apartment.rooms }}</li>
          <li class="text-gray-700"><strong>Letti:</strong> {{ apartment.beds }}</li>
          <li class="text-gray-700"><strong>Bagni:</strong> {{ apartment.bathrooms }}</li>
          <li class="text-gray-700"><strong>Indirizzo:</strong> {{ apartment.address }}</li>
          <li class="text-gray-700"><strong>Metri Quadri:</strong> {{ apartment.square_meters }} m²</li>
        </ul>
      </div>

      <!-- Servizi dell'appartamento -->
      <div v-if="apartment.services && apartment.services.length > 0">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Servizi Disponibili</h2>
        <ul class="list-disc pl-5 space-y-1 text-gray-700">
          <li v-for="(service, index) in apartment.services" :key="index">
            {{ service.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Mappa e Form di contatto a tutta larghezza -->
    <div class="col-span-1 col-span-2 space-y-6">
      <!-- Mappa -->
      <div id="map" class="w-full h-96 rounded-lg shadow-md"></div>

      <!-- Form di contatto -->
      <ContactForm :apartment-id="parseInt(this.$route.params.id)" class="mt-8 w-full" />
    </div>

    <!-- Bottone per tornare alla lista degli appartamenti -->
    <router-link to="/apartments" class="col-span-2 text-center inline-block bg-[#BFAFA2] text-[#EDEEF0] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#BDAFA2] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      Torna alla lista degli appartamenti
    </router-link>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px; 
  border-radius: 12px;
  margin-top: 20px;
}

.shadow-pre{
  box-shadow: 0 0 3px #B49578;
}
</style>
