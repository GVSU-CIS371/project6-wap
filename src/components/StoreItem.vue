<template>
  <v-card>
    <v-img :src="product.image" height="200px"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>${{ product.price }} - Rating: {{ product.rating }}/5</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn class="text-button" :disabled="product.stock === 0">{{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Product } from '../types/product';

const { product } = defineProps<{
  product: Product;
}>();
</script>