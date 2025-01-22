<template>
  <div class="px-4">
    <header class="py-4 dark:text-white">
      <nav class="flex justify-between items-center">
        <h1>Ecommerce Shop</h1>
        <div class="flex gap-4 sm:gap-8 items-center">
          <NuxtLink to="/" active-class="text-white bg-blue-500 py-2 px-4"
            >Home</NuxtLink
          >
          <NuxtLink to="cart" active-class="text-white bg-blue-500 py-2 px-4"
            >Cart</NuxtLink
          >
          <button
            @click="
              () => {
                darkTheme = !darkTheme;
                switcher(darkTheme);
              }
            "
          >
            {{ darkTheme === false ? "Dark" : "Light" }}
          </button>
        </div>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const darkTheme = ref(false);

onBeforeMount(() => {
  if (
    localStorage.getItem("darkMode") === null &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    localStorage.setItem("darkMode", "true");
    document.body.classList.add("dark");
    darkTheme.value = true;
  } else if (localStorage.getItem("darkMode")) {
    document.body.classList.add("dark");
    darkTheme.value = true;
  } else {
    document.body.classList.remove("dark");
    darkTheme.value = false;
  }
});

watch(darkTheme, () => {
  if (
    localStorage.getItem("darkMode") === null &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    localStorage.setItem("darkMode", "true");
    document.body.classList.add("dark");
    darkTheme.value = true;
  } else if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    darkTheme.value = true;
  } else {
    document.body.classList.remove("dark");
    darkTheme.value = false;
  }
});

function switcher(theme: boolean) {
  localStorage.setItem("darkMode", String(theme));
}
</script>
