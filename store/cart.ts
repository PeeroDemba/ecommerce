export const useCartStore = defineStore("cart", () => {
  let cart: { item: string; price: number; image: string }[] = reactive([]);

  function inserter(
    item: string,
    price: number,
    image: string,
    cartArray: { item: string; price: number; image: string }[]
  ) {
    if (cartArray.length >= 1) {
      const exist = cart.some((e) => e.item === item);
      !exist && cart.push({ item, price, image });
      !exist && alert("Product added to cart");
      exist && alert("Product already exists inside the cart");
      return;
    } else {
      cart.push({ item, price, image });
      alert("Product added to cart");
    }
  }

  return { cart, inserter };
});
