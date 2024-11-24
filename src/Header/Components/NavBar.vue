<script>
export default {
  data() {
    return {
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
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
};
</script>

<template>
  <header
    :class="[ 
      'fixed top-0 left-0 right-0 w-full transition-all duration-200 ease-in-out z-50 shadow-md',
      isScrolled ? 'w-1/4 rounded-full py-3 px-6 mx-auto mt-3 bg-teal-600 shadow-scroll' : 'w-full py-4 mx-0 mt-0 bg-white',
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
      <nav :class="[isScrolled ? 'space-x-4' : 'space-x-6']" class="flex md:flex md:space-x-6">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.path"
          :class="[ 
            'transition-colors duration-200 text-md font-medium',
            isScrolled ? 'text-white hover:text-teal-300' : 'text-gray-600 hover:text-teal-800',
          ]"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Pulsante di accesso -->
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
  </header>
</template>

<style scoped>

.shadow-scroll{
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.425);
}

</style>
