<template>
  <main class="container text-text-primary h-[88vh]">
    <div class="pt-4 mb-8 relative overflow-y-auto">
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
</script>
