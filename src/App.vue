<template>
  <div>
    <div class="text-center py-4">
      <p class="display-4">Gerador de Nomes</p>
      <p>Projeto fullstack utilizando Vue.js, GraphQL e Node</p>
    </div>
    <div class="main">
      <div class="container py-3">
        <div class="row">
          <div class="col-md-6 my-3">
            <h5>
              Prefixos
              <span class="badge badge-info">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="(prefix, i) in prefixes" v-bind:key="i">
                    {{ prefix }}
                    <button class="btn btn-danger float-right" v-on:click="deletePrefix(prefix)"><span class="fa fa-trash"></span></button>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input type="text" class="form-control" v-on:keyup.enter="addPrefix(prefix)" v-model="prefix" placeholder="Digite o prefixo" />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addPrefix(prefix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 my-3">
            <h5>
              Sufixos
              <span class="badge badge-info">{{ sufixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="(sufix, i) in sufixes" v-bind:key="i">
                    {{ sufix }}
                    <button class="btn btn-danger float-right" v-on:click="deleteSufix(sufix)"><span class="fa fa-trash"></span></button>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input type="text" class="form-control" v-on:keyup.enter="addSufix(sufix)" v-model="sufix" placeholder="Digite o sufixo"/>
                  <div class="input-group-append">
                    <button class="btn btn-primary" v-on:click="addSufix(sufix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <h5>
              Nomes Disponíveis
              <span class="badge badge-info">{{ domains.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="(domain, i) in domains" v-bind:key="i">
                    {{ domain.name }}
                    <a v-bind:href="domain.checkout" class="btn btn-info float-right" role="button"><span class="fa fa-shopping-cart"></span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default {
  name: "app",
  data: function() {
    return {
      prefix: null,
      sufix: null,
      prefixes: ["Air", "Jet", "Flight"],
      sufixes: ["Hub", "Station", "Smart"],
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
      this.prefix = "";
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
      this.sufix = "";
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
      this.prefix = "";
    },
    deleteSufix(sufix) {
      this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
      this.sufix = "";
    }
  },
  computed: {
    domains() {
      let domains = [];

      for(let p of this.prefixes) {
        for(let s of this.sufixes) {
          const name = `${p}${s}`;
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=.com.br`;
          domains.push({
            name,
            checkout
          });
        }
      }

      return domains;
    }
  },
};
</script>

<style>
.main {
  background-color: #f1f1f1;
}
</style>


