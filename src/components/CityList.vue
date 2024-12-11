<template>
  <div>
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city), scrollTop()" />
    </div>

    <p class="text-text-primary dark:text-text-primary--light" v-if="savedCities.length === 0">
      <i class="fa-solid fa-circle-info" />
      No locations added. To start tracking a location, search in the field
      above.
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const scrollTop = () => {
  window.scrollTo(0,0);
}

const savedCities = ref([]);
const API_KEY = import.meta.env.VITE_API_KEY;
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${API_KEY}&units=metric`
        )
      );
    });
    const weatherData = await Promise.all(requests);
    // Flicker delay
    await new Promise((res) => setTimeout(res, 300));
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
  });
};
</script>
