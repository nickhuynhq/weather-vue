<template>
  <header class="sticky top-0 bg-header shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-text-primary py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div
          class="flex items-center gap-3 duration-150 hover:text-text-hover hover:scale-105"
        >
          <i class="fa-solid fa-sun text-3xl"></i>
          <p class="text-2xl">Weather Vue</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <span
          class="flex gap-2 justify-end items-center duration-150 hover:text-text-hover hover:scale-105 cursor-pointer"
          @click="toggleModal"
        >
          <i class="fa-solid fa-circle-info text-xl" />
          <p>Info</p>
        </span>

        <i
          class="fa-solid fa-plus text-xl hover:text-text-hover hover:scale-125 duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        />
        
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("saved")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lon: route.query.lon,
      lat: route.query.lat,
    },
  };

  // Set City in local storage
  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  // Remove the preview from route when the City is added
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
