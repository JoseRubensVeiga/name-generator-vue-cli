<template>
    <div>
        <div class="container py-3">
            <div class="row">
                <div class="col-md-6 my-3">
                    <ItemList v-bind:items="prefixes" itemName="Prefixo" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix"></ItemList>
                </div>
                <div class="col-md-6 my-3">
                    <ItemList v-bind:items="sufixes" itemName="Sufixo" v-on:addItem="addSufix" v-on:deleteItem="deleteSufix"></ItemList>
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
</template>

<script>

import ItemList from "./ItemList";
import axios from "axios/dist/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";


export default {
  name: "app",
  components: {
    ItemList
  },
  data: function() {
    return {
      prefix: null,
      sufix: null,
      prefixes: [],
      sufixes: [],
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
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
        {
          prefixes: items(type: "prefixes") {
            id
            type
            description
          }

          sufixes: items(type: "sufixes") {
            id
            type
            description
          }
        }
        `
      }
    }).then(response => {
      const res = response.data;

      this.sufixes = res.data.sufixes.map(sufixe => sufixe.description);
      this.prefixes = res.data.prefixes.map(prefixe => prefixe.description);
    });
  }
};
</script>

<style>

</style>


