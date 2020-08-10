<template>
  <div id="inner">
    <div class="row">
      <div class="col-12 text-center">

      </div>
    </div>
    <div class="row">
      <div class="col-6">
        Your roles are:
      </div>
      <div class="col-6">
        <ul class="list">
          <li v-for="role in this.$store.state.authentication.user.user.roles" :key="role">
            {{role}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    console.log(this.$store.state.authentication.user.user.roles)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
