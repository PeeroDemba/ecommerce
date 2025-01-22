<template>
  <main class="pb-6">
    <div
      v-if="loading"
      class="flex justify-center items-center h-[calc(100vh-56px)] dark:text-white"
    >
      <p>Loading...</p>
    </div>
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 dark:text-white"
    >
      <div
        v-for="(product, index) of products"
        :key="index"
        class="flex flex-col gap-x-4 gap-y-8 items-center justify-between"
      >
        <img
          :src="product.image"
          :alt="product.title"
          width="400"
          height="400"
        />
        <div class="flex flex-col gap-2 w-full">
          <p class="text-justify">{{ product.title }}</p>
          <p>{{ product.category }}</p>
          <p>${{ product.price + product.price * (2.2 / 100) }}</p>
          <button
            @click="
              () => {
                cart.inserter(
                  product.title,
                  product.price + product.price * (2.2 / 100),
                  product.image,
                  cartItems
                );
              }
            "
            class="text-white bg-purple-700 py-2 px-4 rounded-md text- active:bg-purple-400 hover:bg-purple-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import axios from "axios";
import { useCartStore } from "~/store/cart";

const cart = useCartStore();
const { cart: cartItems } = storeToRefs(cart);

const loading = useState("loading", () => false);
const products = useState<
  | {
      category: string;
      description: string;
      id: number;
      image: string;
      price: number;
      rating: { count: number; rate: number };
      title: string;
    }[]
  | null
>("products", () => null);
await useAsyncData(
  async () => {
    try {
      loading.value = true;
      const response = await axios.get("https://fakestoreapi.com/products");
      const data = await response.data;
      products.value = data;
      return data;
    } catch (error) {
      throw createError({
        statusMessage: "Failed to fetch",
      });
    } finally {
      loading.value = false;
    }
  },
  { lazy: true }
);
</script>
