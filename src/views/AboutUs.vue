<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Joshua Dimanauham',
          role: 'Fullstack Web Developer',
          description: 'Grande giocatore di fortnite',
          imageUrl: 'src/assets/JoshImg.jpg',
          contact: {
            github: 'https://github.com/MindfulLearner',
            linkedin: 'https://www.linkedin.com/in/joshua-dimaunahan-473977195/',
            website: ''
          }
        },
        {
          id: 2,
          name: 'Salvatore Impellizzeri',
          role: 'Fullstack Web Developer',
          description: 'Grande tryharder di codici',
          imageUrl: 'src/assets/Salvatore-CV.jpg',
          contact: {
            github: 'https://github.com/salvatore-impellizzeri',
            linkedin: 'https://linkedin.com/in/salvatore-impellizzeri-2a6a83338',
            website: ''
          }
        },
        {
          id: 3,
          name: 'Steven Hu',
          role: 'Fullstack Web Developer',
          description: 'Grande pigro',
          imageUrl: 'src/assets/StevenImg.png',
          contact: {
            github: 'https://github.com/surefire-hu',
            linkedin: 'https://linkedin.com/in/steven-hu-775082316',
            website: ''
          }
        }
      ]
    }
  }
}
</script>

<template>
  <div class="bg-gradient-to-b from-white to-gray-200 h-[700px] md:h-auto md:mt-[50px] md:pt-20 flex items-center justify-center animate__animated animate__fadeIn">
    <div class="max-w-7xl px-6 lg:px-8">
      <h1 class="text-gray-800 text-3xl font-semibold tracking-tight text-center animate__animated animate__fadeInDown">
        Il nostro Team
      </h1>
      <p class="mt-6 text-lg text-gray-600 text-center animate__animated animate__fadeInUp animate__delay-1s">
        Siamo un gruppo dinamico di individui appassionati di ciò che facciamo e dedicati a ottenere i migliori risultati per i nostri clienti.
      </p>
      <div class="grid gap-8 md:mt-0 mt-12 md:grid-cols-1 grid-cols-3 sm:scale-90 ">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="border bg-gradient-to-b from-white to-[gray-200] border-gray-300 rounded-lg shadow-lg transition-all transform hover:scale-110 hover:shadow-2xl animate__animated animate__fadeInUp animate__delay-2s"
        >
          <div class="flex flex-col items-center p-4">
            <img
              :src="member.imageUrl"
              alt=""
              class="h-32 w-32 rounded-full bg-gray-50 object-cover animate__animated animate__fadeIn animate__delay-3s"
            />
            <h2 class="mt-4 text-base font-semibold tracking-tight text-gray-800">{{ member.name }}</h2>
            <p class="text-sm font-semibold" :style="{ color: '#B49578' }">{{ member.role }}</p>
            <p class="text-gray-600 text-center mt-2">{{ member.description }}</p>
            <div class="flex space-x-4 mt-4">
              <a
                :href="member.contact.github"
                target="_blank"
                class="text-gray-600 hover:text-[#B49578] transition-colors duration-300 animate__animated animate__fadeIn"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                :href="member.contact.linkedin"
                target="_blank"
                class="text-gray-600 hover:text-[#B49578] transition-colors duration-300 animate__animated animate__fadeIn"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a
                v-if="member.contact.website"
                :href="member.contact.website"
                target="_blank"
                class="text-gray-600 hover:text-[#B49578] transition-colors duration-300 animate__animated animate__fadeIn"
              >
                <i class="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

body {
  overflow: auto;
}

h1 {
  animation-duration: 1.5s;
}

.grid div {
  animation-duration: 1s;
}
</style>
