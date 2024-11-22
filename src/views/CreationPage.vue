<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        user_id: 1,
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
      apartmentCreated: null,
    }
  },

  methods:{
    createApartment(){
      console.log(this.form);
        axios
            .post('http://127.0.0.1:8000/api/apartments', this.form)
            .then((res) => {
              this.apartmentCreated = res.data;
              console.log('Appartamento creato con successo:', this.apartmentCreated);
            })
            .catch((err) => {
                this.$router.push({ name: 'not-found' });
			});
        }
    }
}
</script>

<template>
  <div class="bg-yellow-400 w-1/2 rounded-lg my-7 p-5 mx-auto text-left">
    <form @submit.prevent="createApartment" action="">
      <div class="py-4">
        <label for="title">Titolo</label>
        <input class="shadow-md rounded" required type="text" v-model="form.title">
      </div>
      <div class="py-4">
        <label for="rooms">Stanze</label>
        <input class="shadow-md rounded" required type="number" v-model="form.rooms">
      </div>
      <div class="py-4">
        <label for="beds">Letti</label>
        <input class="shadow-md rounded" required type="number" v-model="form.beds">
      </div>
      <div class="py-4">
        <label for="bathrooms">Bagni</label>
        <input class="shadow-md rounded" required type="number" v-model="form.bathrooms">
      </div>
      <div class="py-4">
        <label for="square_meters">Metri quadri</label>
        <input class="shadow-md rounded" required type="number" v-model="form.square_meters">
      </div>
      <div class="py-4">
        <label for="address">Indirizzo</label>
        <input class="shadow-md rounded" required type="text" v-model="form.address">
      </div>
      <div class="py-4">
        <label for="latitude">Latitudine</label>
        <input class="shadow-md rounded" type="text" v-model="form.latitude">
      </div>
      <div class="py-4">
        <label for="longitude">Longitudine</label>
        <input class="shadow-md rounded" type="text" v-model="form.longitude">
      </div>
      <div class="py-4">
        <label for="image">Immagine (URL/Path)</label>
        <input class="shadow-md rounded" required type="text" v-model="form.image" />
      </div>
      <div class="py-4">
        <label for="is_visible">Visibile</label>
        <input class="shadow-md rounded" type="checkbox" v-model="form.is_visible">
      </div>

      <!-- BOTTONE SUBMIT -->

      <div>
        <button type="submit">Crea Appartamento</button>
      </div>
    </form>

    <div v-if="apartmentCreated">
      <p>Appartamento creato con successo!</p>
      <p>{{ apartmentCreated }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
                     