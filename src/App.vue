<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary dark:bg-weather-secondary--light ">
    <SiteNavigation />
    <RouterView :key="$route.path" v-slot="{ Component }">
      <!-- Set page transition animation -->
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Footer />
  </div>
</template>

<script setup>
  import {RouterView} from 'vue-router'
  import SiteNavigation from './components/SiteNavigation.vue'
import Footer from './components/Footer.vue';
</script>

<style>
html.dark{
  color-scheme: dark;
}
.page-enter-active {
  transition: 600ms ease all;
}
.page-enter-from {
  opacity: 0;
}
</style>