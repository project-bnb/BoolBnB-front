<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        id:'',
        user_id:'2',
        title: '',
        rooms: 0,
        beds: 0,
        bathrooms: 0,
        square_meters: 0,
        address: '',
        latitude: '',
        longitude: '',
        image: '',
        is_visible: false,
      },
      apartmentUpdated: false,
    }
  },

  mounted(){
    this.getApartment();
  },

  created() {
      const apartmentId = this.id || this.$route.params.id;
      this.form.id = apartmentId;
  },

  methods:{
    getApartment(){
      axios
        .get(`http://127.0.0.1:8000/api/apartments/${this.form.id}`)
        .then((res) => {
            this.form = res.data.data;
            console.log(this.form);
        })
        .catch((err) => {
            this.$router.push({ name: 'not-found' });
        });
      },

    updateApartment(){
        axios
          .put(`http://127.0.0.1:8000/api/apartments/${this.form.id}`, this.form)
          .then((res) => {
              this.apartmentUpdated = true;
              console.log('Appartamento aggiornato con successo:', this.form);
          })
          .catch((err) => {
              this.$router.push({ name: 'not-found' });
          });
        }
    },  
}
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Aggiorna Appartamento</h1>
    <form @submit.prevent="updateApartment">
      <div class="grid grid-cols-1 gap-6">
        <!-- Titolo -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Titolo</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Inserisci un titolo..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Stanze -->
        <div>
          <label for="rooms" class="block text-sm font-medium text-gray-700">Stanze</label>
          <input
            type="number"
            id="rooms"
            v-model="form.rooms"
            placeholder="Inserisci il numero di stanze..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Letti -->
        <div>
          <label for="beds" class="block text-sm font-medium text-gray-700">Letti</label>
          <input
            type="number"
            id="beds"
            v-model="form.beds"
            placeholder="Inserisci il numero di letti..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Bagni -->
        <div>
          <label for="bathrooms" class="block text-sm font-medium text-gray-700">Bagni</label>
          <input
            type="number"
            id="bathrooms"
            v-model="form.bathrooms"
            placeholder="Inserisci il numero di bagni..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Metri Quadri -->
        <div>
          <label for="square_meters" class="block text-sm font-medium text-gray-700">Metri Quadri</label>
          <input
            type="number"
            id="square_meters"
            v-model="form.square_meters"
            placeholder="Inserisci i metri quadri..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Indirizzo -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Indirizzo</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            placeholder="Inserisci l'indirizzo..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Latitudine -->
        <div>
          <label for="latitude" class="block text-sm font-medium text-gray-700">Latitudine</label>
          <input
            type="text"
            id="latitude"
            v-model="form.latitude"
            placeholder="Inserisci la latitudine..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        <!-- Longitudine -->
        <div>
          <label for="longitude" class="block text-sm font-medium text-gray-700">Longitudine</label>
          <input
            type="text"
            id="longitude"
            v-model="form.longitude"
            placeholder="Inserisci la longitudine..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        <!-- Immagine -->
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700">Immagine (URL/Path)</label>
          <input
            type="text"
            id="image"
            v-model="form.image"
            placeholder="Inserisci l'URL dell'immagine..."
            class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
          />
        </div>

        <!-- Visibilità -->
        <div class="flex items-center">
          <input
            id="is_visible"
            type="checkbox"
            v-model="form.is_visible"
            class="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <label for="is_visible" class="ml-2 text-sm font-medium text-gray-700">Visibile</label>
        </div>

        <!-- Pulsante Submit -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-yellow-500 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Aggiorna Appartamento
          </button>
        </div>
      </div>
    </form>

    <!-- Messaggio di successo -->
    <div v-if="apartmentUpdated" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
      <p>Appartamento aggiornato con successo!</p>
    </div>
  </div>
</template>

<style scoped>

</style>
                     