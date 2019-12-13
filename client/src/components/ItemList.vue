<template>
  <div>
    <h5>
        {{ itemName }}s
        <span class="badge badge-info">{{ items.length }}</span>
      </h5>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="(item, i) in items" v-bind:key="i">
              {{ item }}
              <button class="btn btn-danger float-right" v-on:click="deleteItem(item)"><span class="fa fa-trash"></span></button>
            </li>
          </ul>
          <br />
          <div class="input-group">
            <input type="text" class="form-control" v-on:keyup.enter="addItem(item)" v-model="item" v-bind:placeholder="`Digite o ${itemName}`" />
            <div class="input-group-append">
              <button class="btn btn-info" v-on:click="addItem(item)">
                <span class="fa fa-plus"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  props: [
    "items",
    "itemName"
  ],
  data() {
    return {
      item: ""
    };
  },
  methods: {
    addItem(item) {
      this.$emit("addItem", item);
      this.item = "";
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
      this.item = "";
    }
  }
};
</script>
