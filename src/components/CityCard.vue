<template>
  <div class="flex p-6 px-6 bg-weather-secondary rounded-md shadow-md duration-150 hover:scale-105 cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <div class=" flex justify-center items-center gap-2">
        <img
          class="w-[50px] h-auto bg-white rounded-md"
          :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
        />
        <p class="text-3xl self-end">
          {{ Math.round(city.weather.main.temp)}}&deg;
        </p>
      </div>
      
      <div class="flex gap-2">
        <span class="text-xs">
          H: {{Math.round(city.weather.main.temp_max)}}&deg;
          L: {{Math.round(city.weather.main.temp_min)}}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

</script>
