<script>
import axios from 'axios';

export default {
  data() {
    return {
        created: null,
    }
  },

  mounted(){
    this.getCreated();
  },

  methods:{
    getCreated(){
        axios
            .get('http://127.0.0.1:8000/api/apartments')
            .then((res) => {
                this.created = res.data;
                console.log(this.created);
            })
            .catch((err) => {
                this.$router.push({ name: 'not-found' });
			});
        }
    }
}
</script>

<template>
    <form action="">
        
    </form>
</template>

<style scoped>

</style>
