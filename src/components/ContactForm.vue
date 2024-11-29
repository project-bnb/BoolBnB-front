<script>
import axios from 'axios';

export default {
  props: {
    apartmentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
        email: '',
        message: '',
        apartment_id: this.apartmentId
      },
      submitted: false,
      error: null
    }
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/emailreceiver', this.form);
        this.submitted = true;
        this.error = null;
        // Reset form
        this.form.email = '';
        this.form.message = '';
      } catch (err) {
        this.error = `Si è verificato un errore durante l'invio del messaggio.`;
        console.error('Errore:', err);
      }
    }
  }
}
</script>

<template>
  <div class="bg-[#EDEEF0] p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-[#BFAFA2] mb-4">Contatta il proprietario</h2>
    
    <form @submit.prevent="sendMessage" v-if="!submitted">
      <div class="mb-4">
        <label for="email" class="block text-[#BFAFA2] font-semibold mb-2">La tua email:</label>
        <input 
          type="email" 
          id="email"
          v-model="form.email"
          required
          class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#B49578]"
        >
      </div>

      <div class="mb-4">
        <label for="message" class="block text-[#BFAFA2] font-semibold mb-2">Il tuo messaggio:</label>
        <textarea 
          id="message"
          v-model="form.message"
          required
          rows="4"
          class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#B49578]"
        ></textarea>
      </div>

      <button 
        type="submit"
        class="bg-[#BFAFA2] text-white px-6 py-2 rounded-lg hover:bg-[#B49578] transition-colors duration-300"
      >
        Invia Messaggio
      </button>
    </form>

    <div v-else class="text-center text-[#BFAFA2]">
      <p class="text-lg">Messaggio inviato con successo!</p>
    </div>

    <div v-if="error" class="mt-4 text-red-500">
      {{ error }}
    </div>
  </div>
</template>