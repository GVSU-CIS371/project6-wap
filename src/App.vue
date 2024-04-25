<template>
  <v-app>
    <v-app-bar class="deep-purple darken-3">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="link in links" :key="link.text" :to="link.to" text class="mr-5">
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn color="pink accent-2" @click="dialog = true">
        <v-icon left>mdi-plus-box</v-icon>
        Add Product
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>

    <v-footer color="indigo" app>
      © {{ new Date().getFullYear() }} My Online Store. All rights reserved.
    </v-footer>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Add Product</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newProduct.name" label="Product Name" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newProduct.image" label="Image URL" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newProduct.description" label="Description" outlined dense multiline></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newProduct.price" label="Price ($)" type="number" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newProduct.stock" label="Stock" type="number" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="newProduct.category" :items="['Groceries', 'Electronics', 'Clothing']" label="Category" outlined></v-select>
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="newProduct.rating"
                  :step="0.5"
                  :max="5"
                  thumb-label="always"
                  label="Rating"
                  class="align-center"
                ></v-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="addProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStoreProducts } from './stores/ProductStore';

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const dialog = ref(false);
const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  rating: 0,
  stock: 0,
  image: '',
  category: ''
});

const productStore = useStoreProducts();

const addProduct = async() => {
  console.log("Adding product");
  const product = {
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: newProduct.value.price,
    rating: newProduct.value.rating,
    stock: newProduct.value.stock,
    image: newProduct.value.image,
    category: newProduct.value.category
  };
  const finalProduct = {
    id: product.name,
    data: product
  }
  await productStore.createProduct(finalProduct);
  newProduct.value = {
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    image: '',
    category: ''
  };
  dialog.value = false;
};
</script>
