<template>
  <div
    class="flex p-6 px-6 mb-6 bg-weather-secondary dark:bg-weather-primary--light dark:text-text-primary--light rounded-md shadow-md duration-150 hover:scale-105 cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
      <h3>
        {{
          new Date(utc + 1000 * city.weather.timezone_offset).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </h3>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex justify-end items-center gap-4">
        <img
          class="w-[64px] h-auto dark:bg-slate-300 bg-slate-400 rounded-xl"
          :src="`https://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}@2x.png`"
        />
        <div class="flex flex-col items-end min-w-[36px]">
          <p class="text-3xl">{{ Math.round(city.weather.current.temp) }}&deg;</p>
          <p class="">{{ city.weather.current.weather[0].main }}</p>
        </div>

      </div>

      <div class="flex justify-end gap-2">
        <span class="text-sm mt-0">
          H: {{ Math.round(city.weather.daily[0].temp.max) }}&deg; L:
          {{ Math.round(city.weather.daily[0].temp.min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const d = new Date();
const localTime = d.getTime();
const localOffset = d.getTimezoneOffset() * 60000;
const utc = localTime + localOffset;
// const time = utc + (1000 * -(city.weather.timezone))
// nd = new Date(time)

defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

console.log();
</script>
