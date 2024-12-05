<script>
import { store } from '../store';

export default {
  data() {
    return {
      store,
      message: '',
    }
  },

  methods: {
    sendMessage() {
      if (this.message.trim()) {
        // Emetti l'evento per incrementare il contatore
        this.$emit('message-sent');
        this.message = '';
        // Incrementa il contatore nello store
        store.unreadMessages++;
      }
    }
  }
}
</script>

<template>
  <div class="message-form">
    <form @submit.prevent="sendMessage">
      <input 
        v-model="message" 
        type="text" 
        placeholder="Scrivi un messaggio..."
        class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#B49578]"
      />
      <button 
        type="submit"
        class="mt-2 px-4 py-2 bg-[#B49578] text-white rounded-lg hover:bg-opacity-90"
      >
        Invia
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>