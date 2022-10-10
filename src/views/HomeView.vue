<script setup>
import { ref } from "vue";
import axios from "axios";

const API_KEY = "f3f2eb8da178081b60066bdf34143e33";
const searchQuery = ref("");
const searchLimit = 5;
const queryTimeout = ref(null);
const querySearchResults = ref(null);

const getSearchResults = () => {
  // Each time function is ran, it will clear out previous settimeout method
  clearTimeout(queryTimeout.value);
  // Create a lazy search to get information from weather API
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value) {
      const result = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=${searchLimit}&appid=${API_KEY}`
      );
      querySearchResults.value = result.data;
      console.log(querySearchResults);
      return;
    }
    querySearchResults.value = null;
  }, 300);
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="querySearchResults"
      >
        <li
          v-for="searchResult in querySearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{ searchResult.name }}, {{ searchResult.country }}
        </li>
      </ul>
    </div>
  </main>
</template>
