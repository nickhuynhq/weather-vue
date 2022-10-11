<template>
  <main class="container text-text-primary h-[85vh]">
    <div class="pt-4 mb-8 relative overflow-y-auto">
      <!-- <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="sticky top-0 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0#004E71]"
      />
      <ul
        class="flex flex-col gap-3 rounded-md bg-weather-secondary text-text-primary w-full shadow-md py-2 px-4 mt-4 top-[66px]"
        v-if="querySearchResults"
      >
        <p v-if="searchError">
          <i class="fa-solid fa-triangle-exclamation" />
          Uh oh, something went wrong, please try again.
        </p>
        <p v-if="!serverError && querySearchResults.length === 0">
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
            {{ searchResult.name }}, {{ searchResult.state || `${searchResult.name}`}},
            {{ searchResult.country }}
          </li>
        </template>
      </ul> -->
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
// import { ref } from "vue";
// import axios from "axios";
// import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

// const API_KEY = "f3f2eb8da178081b60066bdf34143e33";
// const searchQuery = ref("");
// const searchLimit = 5;
// const searchError = ref(null);
// const queryTimeout = ref(null);
// const querySearchResults = ref(null);

// const getSearchResults = () => {
//   // Each time function is ran, it will clear out previous settimeout method
//   clearTimeout(queryTimeout.value);
//   // Create a lazy search to get information from weather API
//   queryTimeout.value = setTimeout(async () => {
//     if (searchQuery.value) {
//       try {
//         const result = await axios.get(
//           `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=${searchLimit}&appid=${API_KEY}`
//         );
//         querySearchResults.value = result.data;
//       } catch {
//         searchError.value(true);
//       }
//       return;
//     }
//     querySearchResults.value = null;
//   }, 300);
// };

// const router = useRouter();

// const previewCity = (searchResult) => {
//   const city = searchResult.name;
//   const state = searchResult.state || searchResult.country;
//   const country = searchResult.country;

//   router.push({
//     name: "cityView",
//     params: { state: state, city: city },
//     query: {
//       lat: searchResult.lat,
//       lon: searchResult.lon,
//       country: country,
//       preview: true,
//     },
//   });
// };
</script>
