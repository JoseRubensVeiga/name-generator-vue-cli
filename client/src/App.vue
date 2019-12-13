<template>
  <div>
    <div class="text-center py-4">
      <p class="display-4">Gerador de Nomes</p>
      <p>Projeto fullstack utilizando Vue.js, GraphQL e Node</p>
    </div>
    <div class="main">
      <DomainList></DomainList>
    </div>
  </div>
</template>

<script>

import DomainList from "./components/DomainList";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default {
  name: "app",
  components: {
    DomainList
  }
};
</script>

<style>
.main {
  background-color: #f1f1f1;
}
</style>


