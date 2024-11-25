<script>
import 'animate.css';
import { jumbos } from '../../store.js';

export default {
    data() {
        return {
            jumbos,
            currentIndex: 0,
        };
    },
};
</script>
<template>
    <div class="relative">
        <div class="carousel">
            <div v-for="(jumbo, index) in jumbos" :key="index" v-show="currentIndex === index" class="carousel-item animate__animated animate__fadeInRight">
                <div :style="{ backgroundImage: `url(${jumbo.src})` }" :alt="jumbo.alt" class="w-full bg-cover h-screen">
                    <div :class="jumbo.position">
                        <p :class="jumbo.meet">{{ jumbo.title }}</p>
                        <p :class="jumbo.social">{{ jumbo.subtitle }}</p>
                        <div v-if="jumbo.details">
                            <hr v-if="jumbo.hr" class="border-t-2 border-white mt-4 animate__animated animate__zoomIn animate__delay-3s" />
                            <p :class="jumbo.date">{{ jumbo.details }}</p>
                        </div>
                        <a v-if="jumbo.buttonText" :href="jumbo.buttonLink" :class="jumbo.button">{{ jumbo.buttonText }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <span v-for="(item, index) in jumbos" :key="index" 
                  @click="currentIndex = index" 
                  class="cursor-pointer w-3 h-3 rounded-full" 
                  :class="{'bg-teal-600': currentIndex === index, 'bg-gray-500': currentIndex !== index}"></span>
        </div>
    </div>
</template>