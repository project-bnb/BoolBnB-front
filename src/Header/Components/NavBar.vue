<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      isScrolled: false,
      menuItems: [
        {
          label: "Home",
          path: "/",
        },
        {
          label: "Appartamenti",
          path: "/apartment-list",
        },
      ],
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.isAuthenticated = !!localStorage.getItem('AuthToken');
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },

    handleLogout() {
      localStorage.removeItem('authToken');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  }
};
</script>

<template>
  <header
    :class="[ 
      'transition-all duration-200 ease-in-out z-50 shadow-md',
      isScrolled ? ' rounded-full py-3 px-6 mt-5 bg-teal-600 shadow-scroll mx-auto fixed top-0 right-0 left-0 w-min' : 'w-full py-4 mx-0 mt-0 bg-white',
    ]"
  >
    <div
      :class="[ 
        'container mx-auto flex items-center transition-all duration-200',
        isScrolled ? 'justify-center' : 'justify-between px-6',
      ]"
    >
      <!-- Logo -->
      <div
        v-if="!isScrolled"
        :class="[
          'text-xl font-bold transition-all duration-200',
          'text-teal-600 text-2xl',
        ]"
      >
        <router-link to="/">
          BoolBnB
        </router-link>
      </div>

      <!-- Menu di navigazione -->
      <nav class="flex md:flex md:space-x-6" :class="[isScrolled ? 'space-x-0 divide-x divide-white' : 'space-x-6']">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.path"
          :class="[ 
            'transition-colors duration-200 text-md font-medium px-4',
            isScrolled ? 'text-white hover:text-teal-300' : 'text-gray-600 hover:text-teal-800'
          ]"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Pulsante di accesso -->

      <div v-if="!isAuthenticated">
        <router-link
          v-if="!isScrolled"
          to="/login"
          :class="[ 
            'rounded-lg shadow-md px-4 py-2 transition-all duration-200',
            'bg-teal-600 text-white hover:bg-teal-700',
          ]"
        >
          Accedi
        </router-link>
      </div>

      <!-- Pulsante di accesso -->

      <div v-if="isAuthenticated">
        <div class="relative">
          <!-- Icona del Profilo Utente -->
          <img
            :src="profileImageUrl"
            alt="Profilo Utente"
            class="w-10 h-10 rounded-full cursor-pointer"
            @click="toggleMenu"
          />

          <!-- Menu a tendina -->
          <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md">
            <ul>
              <li>
                <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profilo</router-link>
              </li>
              <li>
                <router-link to="/settings" class="block px-4 py-2 hover:bg-gray-100">Impostazioni</router-link>
              </li>
              <li>
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

.shadow-scroll{
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.425);
}

</style>