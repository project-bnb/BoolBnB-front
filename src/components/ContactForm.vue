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
        message: '',
        email_sender: '',
        recipient_name: '',
        apartment_id: this.apartmentId
      },
      submitted: false,
      error: null,
      user: null,
      isAuthenticated: false
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/user', { withCredentials: true })
    .then(response => {
      this.user = response.data;
      this.isAuthenticated = true;
    })
      .catch(error => console.error('Errore:', error));
  },
  computed: {
    emailModel: {
      get() {
        if (this.isAuthenticated) {
            this.form.email_sender = this.user.email;
          return this.user.email;
        } else {
          return this.form.email_sender;
        }
      }
    }
  },
  methods: {



async sendMessage() {
    axios.post('http://127.0.0.1:8000/api/emailreceiver', this.form, { withCredentials: true })
    .then(response => {
      this.submitted = true;
      this.error = null;
    })
    .catch(error => {
      this.error = `Si è verificato un errore durante l'invio del messaggio.`;
      console.error('Errore:', error);
    })
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
          v-model="emailModel"
          required
          class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#B49578]"
        >
      </div>

      <div class="mb-4">
        <label for="recipient_name" class="block text-[#BFAFA2] font-semibold mb-2">Il nome del destinatario:</label>
        <input
          type="text"
          id="recipient_name"
          v-model="form.recipient_name"
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
