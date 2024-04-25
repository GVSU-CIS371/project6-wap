
<template>
  <v-card 
    class="mx-auto my-2" 
    height="620px" 
    @mouseover="isHovered = true" 
    @mouseleave="isHovered = false" 
    :elevation="isHovered ? 12 : 2"
    v-if="!modify">
    <v-card-title class="text-h6 text-center">
      {{ product.data.name }}
    </v-card-title>
    <v-img height="300px" :src="product.data.image" contain class="mt-2"></v-img>
    <v-card-text>
      <div class="text-subtitle-2 my-2">{{ product.data.description }}</div>
      <div class="my-1">
        <v-icon color="amber darken-3">mdi-star</v-icon> {{ product.data.rating }} / 5
      </div>
      <div class="my-1">
        <v-icon color="green">mdi-cash</v-icon> ${{ product.data.price }}
      </div>
      <div class="my-1">
        <v-icon color="blue">mdi-package-variant-closed</v-icon> {{ product.data.stock }} Units
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="blue lighten-2" @click="modify = true">Modify</v-btn>
      <v-btn color="red lighten-2" @click="confirmDelete(product)">Delete</v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modify Card -->
  <v-card
    class="mx-auto my-2" 
    max-width="500px" 
    height="620px" 
    @mouseover="isHovered = true" 
    @mouseleave="isHovered = false" 
    :elevation="isHovered ? 12 : 2"
    v-else>
    <!-- Action Slot for Modify -->
    <v-card-title class="text-h5">Modify Product</v-card-title>
    <v-card-text>
      <v-text-field v-model="product.data.name" label="Name" outlined dense class="mb-2"></v-text-field>
      <v-text-field v-model="product.data.image" label="Image URL" outlined dense class="mb-2"></v-text-field>
      <v-text-field v-model="product.data.description" label="Description" outlined dense multiline class="mb-2"></v-text-field>
      <v-text-field v-model="product.data.price" label="Price ($)" type="number" outlined dense class="mb-2"></v-text-field>
      <v-text-field v-model="product.data.stock" label="Stock" type="number" outlined dense class="mb-2"></v-text-field>
      <v-combobox :items="['Groceries', 'Electronics', 'Clothing']" label="Category" outlined dense v-model="product.data.category" class="mb-2"></v-combobox>
      <v-slider v-model="product.data.rating" min="0" max="5" step="0.5" label="Rating" thumb-label="always"></v-slider>
    </v-card-text>
    <v-card-actions class="justify-space-around">
      <v-btn color="green darken-1" @click="confirmModify">Modify</v-btn>
      <v-btn color="red darken-1" @click="modify=false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  <confirm-dialog v-model="confirmDialogVisible" @confirm="confirmModify, confirmDialogVisible=false, modify=false" @cancel="cancelModification" />
</template>

<script lang="ts" setup>
import { ProductDoc } from '../types/product.ts';
import { defineProps, ref } from 'vue';
import { useStoreProducts } from '../stores/ProductStore';

defineProps<{
  product: ProductDoc;
}>();

const productStore = useStoreProducts();

async function changeProduct(product: ProductDoc) {
  await productStore.updateProduct(product);
}

var confirmDialogVisible = ref(false);

function confirmModify(product: ProductDoc) {
  confirmDialogVisible.value = true;
  changeProduct(product);
}
async function deleteProduct(product:ProductDoc) {
  await productStore.removeProduct(product);
}

function confirmDelete(product:ProductDoc) {
  if (window.confirm('Are you sure you want to delete this product?')) {
    deleteProduct(product);
  }
}

function cancelModification() {
  confirmDialogVisible.value = false;
}

const isHovered = ref(false);
const modify = ref(false);
</script>




