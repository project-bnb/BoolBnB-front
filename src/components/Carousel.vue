<script>
import axios from 'axios';

export default {
  data() {
    return {
      cover_image: '',
      images: [],
      currentIndex: 0,
    }
  },

  mounted() {
    this.getImages();
  },

  methods: {
    getImages() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/apartments/${id}`)
        .then((res) => {
          this.images = res.data.data.images;
          this.cover_image = res.data.data.cover_image;
          this.images.unshift({ image_path: this.cover_image });
          console.log(this.images);
        })
        .catch((error) => console.error('Errore:', error));
    },

    NextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      }
    },

    PrevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  }
}
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Carousel Images Wrapper -->
    <div
      class="carousel-track flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <!-- Carousel Images -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="min-w-full flex-shrink-0"
      >
        <img
          :src="image.image_path"
          alt="Immagine Appartamento"
          class="w-full h-96 object-cover rounded-lg"
        >
      </div>
    </div>

    <!-- Button for Previous Slide -->
    <button
      @click="PrevSlide()"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <span class="text-xl font-bold">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
    </button>

    <!-- Button for Next Slide -->
    <button
      @click="NextSlide()"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#B49578] text-white rounded-full shadow-md hover:bg-[#EDEEF0] hover:text-[#B49578] hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <span class="text-xl font-bold">
        <i class="fa-solid fa-arrow-right"></i>
      </span>
    </button>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: 100%;
}
</style>
