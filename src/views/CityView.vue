<template>
  <div>
    <!-- Handle asyncronous dependencies, data can wait to be resolved -->
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
