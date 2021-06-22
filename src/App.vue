<template>
  <div id="app">
    <Order :id="id"/>
  </div>
</template>

<script>
import Order from "./components/Order.vue";

export default {
  name: "App",
  components: {
    Order,
  },

  data() {
    return {
          id: 1,
         };
  },

  
};
</script>

<style>
</style>
