<script>

export default {
    data() {
        return { 

        }
    },
    components: {
        
    },
    methods: {
        TurnUp() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<template>
    <div @click="TurnUp" class="fixed bottom-6 right-6 w-12 h-12 bg-[#B49578] text-[#EDEEF0] rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110">
        <i class="fa-solid fa-arrow-up text-lg"></i>
    </div>
</template>

<style scoped>
</style>
