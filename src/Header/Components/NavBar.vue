<script>
import { store } from '../../store';
import axios from 'axios';

export default {
  data() {
    return {
      store,
      isScrolled: false,
      selected: false,
      submit: false,
      selectedIndex: -1,
      isAuthenticated: false,
      user: null,
      isDropdownOpen: false,
      isNotificationsOpen: false,
      notifications: [],
      messageCount: 0,
    };
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
    window.removeEventListener('scroll', this.handleScroll);
  },

  mounted() {
    store.functions.getNotifications();
    document.addEventListener("click", this.handleDocumentClick);

    if (typeof this.store.unreadMessages === 'undefined') {
      this.store.unreadMessages = 0;
    }
    axios.get('http://127.0.0.1:8000/api/user', { withCredentials: true })
      .then(response => {
        this.isAuthenticated = true;
        this.user = response.data;
      })
      .catch(error => console.error('Errore:', error));
  },
  
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.isAuthenticated = !!localStorage.getItem('AuthToken');
  },

  watch: {
    $route(to) {
      if (to.name === 'home') {
        this.store.searchInput = '';
      }
    }
  },

  methods: {
    toggleNotifications() {
      this.isNotificationsOpen = !this.isNotificationsOpen;
    },

    handleScroll() {
      if (this.isApartmentShowPage) {
        return;
      }
      this.isScrolled = window.scrollY > 50;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    handleDocumentClick(event) {
      const dropdown = this.$el.querySelector('.z-dropdown');
      const dropdownTrigger = this.$el.querySelector('.w-8.h-8');
      const notifications = this.$el.querySelector('.absolute.right-0.mt-2');
      const notificationsTrigger = this.$el.querySelector('.fas.fa-bell');

      // Controlla clic esterni per il dropdown
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        dropdownTrigger &&
        !dropdownTrigger.contains(event.target)
      ) {
        this.isDropdownOpen = false;
      }

      // Controlla clic esterni per il menu notifiche
      if (
        notifications &&
        !notifications.contains(event.target) &&
        notificationsTrigger &&
        !notificationsTrigger.contains(event.target)
      ) {
        this.isNotificationsOpen = false;
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      return new Date(dateString).toLocaleString('it-IT', options);
    },
  },

  computed: {
    messageCount() {
      return this.store.unreadMessages;
    }
  }
};
</script>



<template>
  <header
    class='w-full z-50 transition-all duration-300 shadow-nav fixed top-0 left-0 right-0 bg-[#B49578] py-4'>
    <div class="container mx-auto flex items-center w-1/2 2xl:w-10/12 justify-between px-4 sm:w-full sm:px-3 md:px-8">

      <!-- Logo -->
      <div class="text-[#EDEEF0] text-2xl md:hidden w-14 h-10 font-bold sm:hidden">
        <router-link to="/" class="transition-all ease-in-out duration-300 hover:opacity-70 flex items-center">
          <span>LomBnB</span>
        </router-link>
      </div>

      <!-- Link Route -->
      <div class="flex space-x-4 text-[#EDEEF0] text-sm font-medium">
        <router-link to="/" class="transition-all ease-in-out duration-300 hover:opacity-70">
          Home
        </router-link>
        <router-link to="/apartments" class="transition-all ease-in-out duration-300 hover:opacity-70">
          Filtra appartamenti
        </router-link>
        <router-link to="/about" class="transition-all ease-in-out duration-300 hover:opacity-70">
          Chi Siamo
        </router-link>
      </div>

      <!-- pulsante di accesso -->
      <div v-if="!isAuthenticated">
        <a
          href="http://127.0.0.1:8000/login"
          class="ml-4 px-6 py-3 rounded-full text-sm font-semibold transition duration-300 shadow-lg bg-[#EDEEF0] text-[#B49578] hover:bg-[#D1C6B8] hover:shadow-xl"
        >
          Accedi
        </a>
      </div>
      <div v-else class="flex items-center space-x-4">
        <!-- Campanella notifiche con dropdown -->
        <div class="relative" @click="toggleNotifications">
          <!-- Icona campanella -->
          <div 
            class="text-[#EDEEF0] hover:opacity-80 transition-opacity cursor-pointer relative"
            title="Notifiche"
          >
            <i class="fas fa-bell text-xl"></i>
            <!-- Indicatore delle notifiche -->
            <span 
              v-if="messageCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              {{ messageCount }}
            </span>
          </div>

          <!-- Dropdown notifiche -->
          <div 
            v-if="isNotificationsOpen"
            class="absolute right-0 mt-2 w-64 bg-white z-50 rounded shadow-lg border border-gray-200"
          >
            <div class="p-4 text-sm font-medium text-gray-700 border-b">
              Notifiche
            </div>
            <ul class="py-2">
              <li v-if="store.notifications.length > 0" v-for="(notification, index) in store.notifications" :key="index" class="px-4 py-2 hover:bg-gray-100">
                <a 
                  :href="notification.link"
                  class="text-gray-700 text-sm"
                >
                  <span class="font-bold">{{ notification.email_sender }}</span> ti ha contattato alle {{ formatDate(notification.created_at) }}
                </a>
                ha scritto: {{ notification.message }}
              </li>
              <li v-else class="px-4 py-2 text-gray-500">
                Nessuna notifica.
              </li>
            </ul>
          </div>
        </div>


        <!-- link alla dashboard con pallino utente -->
        <div class="relative flex items-center space-x-2">
          <!-- Pallino con iniziale -->
          <div 
            class="w-8 h-8 rounded-full bg-[#EDEEF0] text-[#B49578] flex items-center justify-center font-semibold cursor-pointer"
            title="Dashboard"
            @click="toggleDropdown"
          >
            {{ user.name.charAt(0).toUpperCase() }}
          </div>

          <!-- Dropdown menu -->
          <div 
            v-if="isDropdownOpen == true"
            class="absolute top-[28px] right-0 mt-2 w-48 bg-white z-dropdown rounded shadow-lg border border-gray-200"
          >
            <ul class="py-1">
              <li>
                <a 
                  href="http://127.0.0.1:8000/dashboard"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="http://127.0.0.1:8000/profile"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profilo
                </a>
              </li>
              <li>
                <a 
                  href="http://127.0.0.1:8000/logout"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.shadow-nav {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.315);
}

.z-dropdown{
  z-index: 70;
}
</style>
