<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        id: '',
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

    props: {
        id: {
            type: Number,
            required: true,
        }
    },

    created() {
        const apartmentId = this.id || this.$route.params.id;
        this.form.id = apartmentId;
    },

  methods:{
    updateApartment(){
        console.log(this.form);
        axios
          .put(`http://127.0.0.1:8000/api/apartments/${this.id}`, this.form)
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
  <div class="bg-yellow-400 w-1/2 rounded-lg my-7 p-5 mx-auto text-left">
    <form @submit.prevent="updateApartment" action="">
      <div class="py-4">
        <div>
          <label for="title">Titolo</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="text" placeholder="Inserisci un titolo..." v-model="form.title">
      </div>
      <div class="py-4">
        <div>
          <label for="rooms">Stanze</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="number" placeholder="Inserisci il numero delle stanze..." v-model="form.rooms">
      </div>
      <div class="py-4">
        <div>
          <label for="beds">Letti</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="number" placeholder="Inserisci il numero di letti..." v-model="form.beds">
      </div>
      <div class="py-4">
        <div>
          <label for="bathrooms">Bagni</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="number" placeholder="Inserisci il numero di bagni..." v-model="form.bathrooms">
      </div>
      <div class="py-4">
        <div>
          <label for="square_meters">Metri quadri</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="number" placeholder="Inserisci i metri quadri..." v-model="form.square_meters">
      </div>
      <div class="py-4">
        <div>
          <label for="address">Indirizzo</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="text" placeholder="Inserisci l'indirizzo..." v-model="form.address">
      </div>
      <div class="py-4">
        <div>
          <label for="latitude">Latitudine</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" type="text" placeholder="Inserisci la latitudine..." v-model="form.latitude">
      </div>
      <div class="py-4">
        <div>
          <label for="longitude">Longitudine</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" type="text" placeholder="Inserisci la longitudine..." v-model="form.longitude">
      </div>
      <div class="py-4">
        <div>
          <label for="image">Immagine (URL/Path)</label>
        </div>
        <input class="py-2 px-3 mt-1 w-full shadow-md rounded" required type="text" placeholder="Inserisci un'immagine dell'appartamento..." v-model="form.image" />
      </div>
      <div class="py-4">
        <label for="is_visible">Visibile</label>
        <input class="shadow-md rounded mx-3" type="checkbox" placeholder="" v-model="form.is_visible">
      </div>

      <!-- BOTTONE SUBMIT -->

      <div>
        <button type="submit">Aggiorna Appartamento</button>
      </div>
    </form>

    <div v-if="apartmentUpdated">
      <p>Appartamento aggiornato con successo!</p>
    </div>
  </div>
</template>

<style scoped>

</style>
                     