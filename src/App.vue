<template>
  <div class="container" id="app">
    <navbar :key="navKey"></navbar>
    <div class="row" id="content-body">
      <div class="col-12">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  export default {
    name: 'app',
    components: {Navbar},
    data: () => {
      return {
        navKey: 0
      }
    },
    computed: {
      alert () {
        return this.$store.state.alert
      }
    },
    watch:{
      $route (){
        // clear alert on location change
        this.navKey++;
        this.$store.dispatch('alert/clear');
      }
    },

    mounted() {
    }
  }
</script>
