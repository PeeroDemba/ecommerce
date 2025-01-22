<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cart = useCartStore();
let calculated: { total: number; count: number; item: string }[] = reactive(
  Array.from({ length: cart.cart.length })
);

calculated = reactive(
  cart.cart.map((e) => ({ total: e.price, item: e.item, count: 1 }))
);

function prompter() {
  alert("Purchase Completed Successfully");
}
</script>

<template>
  <main class="pb-6 dark:text-white h-max">
    <div class="grid grid-cols-1 gap-8">
      <div
        v-if="cart.cart.length > 0"
        v-for="(product, index) of cart.cart"
        :key="index"
        class="flex flex-col gap-x-4 gap-y-4 items-center justify-between"
      >
        <img
          :src="product.image"
          :alt="product.item"
          width="400"
          height="400"
        />
        <form class="flex flex-col gap-2 w-[80%]">
          <p class="text-justify">{{ product.item }}</p>
          <p>${{ product.price }}</p>
          <input
            type="number"
            placeholder="Enter number of items"
            aria-label="Enter number of items"
            value="1"
            @input="
              (e) => {
                if (e.target !== null) {
                  calculated[index].total = e.target.value * product.price;
                  calculated[index].count = Number(e.target.value);
                  calculated[index].item = product.item;
                }
              }
            "
            class="py-2 px-2 border border-black dark:text-black"
          />

          <p v-if="calculated[index].total !== product.price">
            Total Value: ${{ calculated[index].total }}
          </p>
          <p v-else>Total Value: ${{ product.price }}</p>
          <button
            type="button"
            aria-label="Remove from Cart"
            @click="
              () => {
                const filtered = cart.cart.filter(
                  (e) => e.item !== product.item
                );
                cart.cart = filtered;
                calculated.splice(index, 1);
                console.log(cart.cart);
              }
            "
            class="text-white bg-purple-700 py-2 px-4 rounded-md text- active:bg-purple-400 hover:bg-purple-400"
          >
            Remove from Cart
          </button>
        </form>
      </div>
      <div v-else class="text-center h-[calc(100vh-60px)]">
        No items in cart
      </div>
    </div>
    <div v-if="cart.cart.length > 0" class="mt-20">
      <p class="text-red-500 text-[3rem] sm:text-[5rem] text-center">
        CHECKOUT
      </p>
      <div class="overflow-x-scroll">
        <div class="min-w-[800px]">
          <div
            class="flex justify-between items-center border font-bold border-black"
          >
            <p class="w-1/3 p-2">Item name</p>
            <p class="w-1/3 p-2 border-l border-r border-black">
              Number of Items
            </p>
            <p class="w-1/3 p-2">Total Value</p>
            <p></p>
          </div>
          <div
            v-for="(items, index) of calculated"
            :key="index"
            class="flex justify-between items-center border border-black"
          >
            <p class="w-1/3 p-2">{{ items.item }}</p>
            <p class="w-1/3 p-2 border-l border-r border-black">
              {{ items.count }}
            </p>
            <p class="w-1/3 p-2">{{ items.total }}</p>
            <p></p>
          </div>
          <div
            class="flex justify-between items-center border font-bold border-black"
          >
            <p class="w-1/3 p-2"></p>
            <p class="w-1/3 p-2 border-l border-r border-black">
              Total Price for all purchased items:
            </p>
            <p class="w-1/3 p-2">
              {{
                calculated.reduce((p, n) => {
                  return p + n.total;
                }, 0)
              }}
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button
          type="button"
          @click="
            () => {
              cart.cart.splice(0, cart.cart.length);
              prompter();
            }
          "
          class="px-4 py-2 bg-purple-800 rounded-md text-white w-[300px]"
        >
          Make Purchase
        </button>
      </div>
    </div>
  </main>
</template>
