<template>
  <div class="flex p-6 px-6 bg-weather-secondary rounded-md shadow-md duration-150 hover:scale-105 cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <div class=" flex justify-end items-center gap-2">
        <p class="text-3xl self-end">
          {{ Math.round(city.weather.main.temp)}}&deg;
        </p>
      </div>
      <p class=" flex justify-end items-center">{{ city.weather.weather[0].main }}</p>
      <div class="flex gap-2">
        <span class="text-sm items-end mt-0">
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
