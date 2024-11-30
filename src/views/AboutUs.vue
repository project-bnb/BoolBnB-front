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
          imageUrl: '',
          contact: {
            github: '',
            linkedin: '',
            website: ''
          }
        },
        {
          id: 2,
          name: 'Salvatore Impellizzeri',
          role: 'Fullstack Web Developer',
          description: 'Grande tryharder di codici',
          imageUrl: '',
          contact: {
            github: '',
            linkedin: '',
            website: ''
          }
        },
        {
          id: 3,
          name: 'Steven Hu',
          role: 'Fullstack Web Developer',
          description: 'Grande pigro',
          imageUrl: '',
          contact: {
            github: '',
            linkedin: '',
            website: ''
          }
        }
      ]
    }
  }
}
</script>

<template>
    <div class="bg-gray-100 h-screen flex items-center justify-center">
      <div class="max-w-7xl px-6 lg:px-8">
        <h1 class="text-gray-800 text-3xl font-semibold tracking-tight text-center">Il nostro Team</h1>
        <p class="mt-6 text-lg text-gray-600 text-center">
          Siamo un gruppo dinamico di individui appassionati di ciò che facciamo e dedicati a ottenere i migliori risultati per i nostri clienti.
        </p>
        <div class="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="member in teamMembers" :key="member.id" class="border border-gray-300 rounded-lg shadow-md">
            <div class="flex flex-col items-center p-4">
              <img :src="member.imageUrl" alt="" class="h-32 w-32 rounded-full bg-gray-50" />
              <h2 class="mt-4 text-base font-semibold tracking-tight text-gray-800">{{ member.name }}</h2>
              <p class="text-sm font-semibold" :style="{ color: '#B49578' }">{{ member.role }}</p> <!-- Cambiato il colore a #B49578 -->
              <p class="text-gray-500 text-center mt-2">{{ member.description }}</p>
              <div class="flex space-x-4 mt-4">
                <a :href="member.contact.github" target="_blank" class="text-gray-600 hover:text-[#B49578]">
                  <i class="fab fa-github"></i>
                </a>
                <a :href="member.contact.linkedin" target="_blank" class="text-gray-600 hover:text-[#B49578]">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a :href="member.contact.website" target="_blank" class="text-gray-600 hover:text-[#B49578]">
                  <i class="fas fa-globe"></i> <!-- Icona per il sito web -->
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
