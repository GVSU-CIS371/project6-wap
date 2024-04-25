<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="product in filteredProducts" :key="product.id">
        <StoreItem :product="product.data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import StoreItem from './StoreItem.vue';
import { useProductStore } from '../stores/ProductStore';

const categoryName = 'Groceries';

const productStore = useProductStore();
const filteredProducts = computed(() => productStore.filterByCategory(categoryName));
</script>