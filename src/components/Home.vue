<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="product in products" :key="product.id">
        <StoreItem :product="product.data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import StoreItem from './StoreItem.vue';
import { useProductStore } from '../stores/ProductStore';
import { ProductDoc } from '../types/product';

const productStore = useProductStore();
const products = ref<ProductDoc[]>([]);

onMounted(() => {
  console.log("Mounting Home component...");
  productStore.init();
  products.value = productStore.products;
  console.log("Products in Home component:", products.value);
});
</script>