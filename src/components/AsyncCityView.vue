<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="flex justify-center items-center gap-2 text-text-secondary p-4 bg-alert w-full text-center"
    >
      <i class="fa-solid fa-circle-info text-xl" />
      <p>
        You are currently previewing this city, click the "+" icon at the top
        right to start tracking this city.
      </p>
    </div>

    <!-- Top Button Container -->
    <div
      class="container flex w-full px-10 pt-8 justify-end gap-3 text-2xl text-text-primary dark:text-text-primary--light"
    >
      <i
        v-if="!route.query.preview"
        title="Remove City"
        class="fa-solid fa-trash hover:scale-125 duration-150 cursor-pointer hover:text-red-500"
        @click="removeCity"
      />
      <i
        title="Add City"
        class="fa-solid fa-plus hover:scale-125 duration-150 cursor-pointer"
        @click="addCity"
        v-if="route.query.preview"
      />
    </div>

    <!-- Weather Overview -->
    <div
      class="flex flex-col items-center text-text-primary dark:text-text-primary--light py-6"
    >
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(weatherData.current.feels_like) }}&deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto dark:bg-slate-300 bg-slate-500 rounded-xl mt-4"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
      />
    </div>

    <hr class="border-text-primary border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-text-primary dark:text-text-primary--light">
        <h2 class="mb-4 text-2xl">Hourly Weather</h2>
        <div class="flex overflow-x-scroll gap-6 pb-6">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col justify-between gap-4 min-w-[50px] items-center"
          >
            <p class="text-primary text-md flex-wrap">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class=" dark:bg-slate-300 bg-slate-500 rounded-lg object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-text-primary border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-text-primary dark:text-text-primary--light">
        <h2 class="mb-4 text-2xl">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center mb-2"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
                day: 'numeric',
                month: 'short'
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] dark:bg-slate-300 bg-slate-500 rounded-lg object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt="weather"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { uid } from "uid";

const API_KEY = import.meta.env.VITE_API_KEY;
const route = useRoute();

const lat = ref(route.query.lat);
const lon = ref(route.query.lon);

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.value}&lon=${lon.value}&appid=${API_KEY}&units=metric`
    );

    // Calculate current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // Calculate hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    // Flicker delay
    await new Promise((res) => setTimeout(res, 300));

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));

  router.push({
    name: "home",
  });
  window.scrollTo(0, 0);
};

const savedCities = ref([]);

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
</script>
