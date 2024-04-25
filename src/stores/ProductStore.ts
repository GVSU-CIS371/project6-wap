import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../main";

export const useStoreProducts = defineStore("storeProducts", {
  state: () => ({ allProducts: <ProductDoc[]>[] }),
  getters: {
    getAllProducts(state) {
      return state.allProducts;
    },
  },
  actions: {
    async init() {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        this.allProducts = initProducts;
        await Promise.all(initProducts.map(async (item) => {
          const productDocument = doc(productsCollection, item.id);
          await setDoc(productDocument, item.data);
        }));
      } else {
        const loadedProducts = productsSnapshot.docs.map(document => ({
          id: document.id,
          data: document.data() as ProductDoc['data']
        }));
        this.allProducts = [...initProducts, ...loadedProducts];
      }
    },
    async createProduct(newProduct: ProductDoc) {
      const newDocRef = await addDoc(collection(db, 'products'), newProduct.data);
      this.allProducts.push({ id: newDocRef.id, data: newProduct.data });
    },
    async removeProduct(targetProduct: ProductDoc) {
      try {
        await deleteDoc(doc(db, "products", targetProduct.id));
        const productIndex = this.allProducts.findIndex(p => p.id === targetProduct.id);
        if (productIndex !== -1) {
          this.allProducts.splice(productIndex, 1);
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
        throw error;
      }
    },
    async updateProduct(updatedProduct: ProductDoc) {
      const productReference = doc(db, 'products', updatedProduct.id);
      try {
        await setDoc(productReference, updatedProduct.data);
        const idx = this.allProducts.findIndex(p => p.id === updatedProduct.id);
        if (idx !== -1) {
          this.allProducts[idx].data = updatedProduct.data;
        }
      } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
      }
    },
    filterByCategory(category: string) {
      this.allProducts = this.allProducts.filter((prod) => prod.data.category === category);
      return this.allProducts;
    },
    filterByRating(minimumRating: number) {
      this.allProducts = this.allProducts.filter((prod) => prod.data.rating >= minimumRating);
      return this.allProducts;
    },
  },
});
