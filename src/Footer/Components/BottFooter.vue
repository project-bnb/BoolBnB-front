<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'About',
          link: ''
        },
        {
          name: 'Blog',
          link: ''
        },
        {
          name: 'Jobs',
          link: ''
        },
        {
          name: 'Press',
          link: ''
        },
        {
          name: 'Accessibility',
          link: ''
        },
        {
          name: 'Partners',
          link: ''
        },
      ],
      socialIcons: [
        { icon: "fa-facebook-f", link: "https://www.facebook.com" },
        { icon: "fa-instagram", link: "https://www.instagram.com" },
        { icon: "fa-x-twitter", link: "https://www.twitter.com" },
        { icon: "fa-github", link: "https://www.github.com" },
        { icon: "fa-youtube", link: "https://www.youtube.com" },
      ],
    };
  },
};
</script>

<template>
  <!-- Divider -->
  <hr class="w-11/12 mx-auto h-1 mb-6 text-gray-200">
  
  <div class="text-[#BDAFA2] py-16 sm:scale-90">
    <!-- Links -->
    <div class="flex justify-center  space-x-8 mb-6 text-sm font-medium">
      <a
        v-for="(link, index) in links"
        :key="index"
        href="#"
        class="hover:opacity-70 transition-all duration-200 ease-in-out text-white drop-shadow-md"
      >
        {{ link.name }}
      </a>
    </div>

    <!-- Social Icons -->
    <div class="flex justify-center space-x-8 mb-6">
      <a
        v-for="(social, index) in socialIcons"
        :key="index"
        :href="social.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white drop-shadow-md text-xl hover:opacity-70 transition-all duration-200 ease-in-out"
      >
        <i :class="`fab ${social.icon}`"></i>
      </a>
    </div>

    <!-- Copyright Text -->
    <div class="text-center text-sm text-white drop-shadow-md ">
      © 2024 MilanBnB, Inc. All rights reserved.
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  color: #EDEEF0;
  transition: color 0.2s ease-in-out;
}
</style>
