<template>
  <v-container>
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
        <store-item :product="product"></store-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import StoreItem from './StoreItem.vue';
import { useStoreProducts } from '../stores/ProductStore';

const ProdStore = useStoreProducts();
ProdStore.init();
ProdStore.filterByCategory("Groceries");
const filteredProducts = ProdStore.getAllProducts;
</script>