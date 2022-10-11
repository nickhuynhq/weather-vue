<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    class="px-4 py-2 text-white bg-[#a3be8c] dark:bg-[#b48ead] rounded-md duration-150 hover:scale-105"
    @click="toggleDark()"
  >
  <i :class="isDark ? 'fa-solid fa-moon' : 'fa-regular fa-sun'"></i> 
    {{isDark ? "Dark Mode" :  "Light Mode"}}
  </button>
</template>
