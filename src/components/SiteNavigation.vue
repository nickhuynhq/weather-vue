<template>
  <header class="sticky top-0 bg-header dark:bg-weather-primary--light shadow-lg" >
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-text-primary  dark:text-text-primary--light py-6"
    >
      <RouterLink :to="{ name: 'home' }" @click="scrollTop">
        <div
          class="flex items-center gap-3 duration-150 hover:scale-105"
        >
          <i class="fa-solid fa-sun text-3xl"></i>
          <p class="text-2xl">Weather Vue</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <span
          class="flex gap-2 justify-end items-center duration-150 hover:scale-105 cursor-pointer"
          @click="toggleModal"
        >
          <i class="fa-solid fa-circle-info text-xl" />
          <p>Info</p>
        </span>

        <i
          class="fa-solid fa-plus text-xl hover:scale-125 duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        />
      </div>
      <DarkMode />

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About</h1>
          <p class="mb-4">
            Weather Vue allows you to track the current and future weather of
            cities of your choosing. <br />
            This application was built with Vue.js and Tailwind CSS. 😀
          </p>
          <h2 class="text-2xl">How it works</h2>
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
          <p class="mb-4">
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>

          <p>
            Made with ❤️ in Toronto, Canada.<br/>
            By Nicholas Huynh
          </p>
        </div>
      </BaseModal>
    </nav>
    <div class="container flex flex-col items-center text-text-primary dark:text-text-primary--light">
      <input
        type="text"
        :ref="input"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-2 w-full bg-transparent duration-150 rounded-md focus:border-weather-secondary  focus:bg-[#4c566a] dark:focus:bg-[#d8dee9] focus:outline-none"
      />
      <hr class="border-text-primary  border w-full" />
      <ul
        class=" container flex flex-col gap-3 rounded-md bg-weather-secondary dark:bg-weather-secondary--light text-text-primary dark:text-text-primary--light w-full shadow-md py-2 px-4 mt-4"
        v-if="querySearchResults"
      >
        <p v-if="searchError" class="p-2 rounded-md text-text-secondary bg-alert">
          <i class="fa-solid fa-triangle-exclamation" />
          Uh oh, something went wrong, please try again.
        </p>
        <p v-if="!serverError && querySearchResults.length === 0" class="p-2 rounded-md text-text-secondary bg-alert">
          <i class="fa-solid fa-triangle-exclamation" />
          No results match your query, please try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in querySearchResults"
            :key="searchResult.id"
            class="py-2 duration-150 hover:text-text-hover border-b-1 border-indigo-500 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.name }},
            {{ searchResult.state || `${searchResult.name}` }},
            {{ searchResult.country }}
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";
import axios from "axios";
import DarkMode from "./DarkMode.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const scrollTop = () => {
  window.scrollTo(0,0);
}

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
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

const API_KEY = import.meta.env.VITE_API_KEY;
const searchQuery = ref("");
const searchLimit = 5;
const searchError = ref(null);
const queryTimeout = ref(null);
const querySearchResults = ref(null);

const getSearchResults = () => {
  // Each time function is ran, it will clear out previous settimeout method
  clearTimeout(queryTimeout.value);
  // Create a lazy search to get information from weather API
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value) {
      try {
        const result = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=${searchLimit}&appid=${API_KEY}`
        );
        querySearchResults.value = result.data;
      } catch {
        searchError.value(true);
      }
      return;
    }
    querySearchResults.value = null;
  }, 300);
};

function previewCity(searchResult){
  
  const city = searchResult.name;
  const state = searchResult.state || searchResult.country;
  const country = searchResult.country;
  searchQuery.value = "";
  querySearchResults.value = null;

  router.push({
    name: "cityView",
    params: { state: state, city: city },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      country: country,
      preview: true,
    },
  });

  window.scrollTo(0,0);
};
</script>
