export const useCartStore = defineStore("cart", () => {
  let cart: { item: string; price: number; image: string }[] = reactive([]);

  return { cart };
});
