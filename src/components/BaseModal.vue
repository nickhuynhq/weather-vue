<template>
    <!-- Use Teleport to place it at the top of your Body tag,
        to avoid styling issues as your application grows -->
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="flex flex-col p-4 bg-weather-secondary dark:bg-weather-primary--light self-start mt-32 max-w-screen-md rounded-md"
          >
            <slot />
            <button
              class="justify-center text-text-secondary bg-weather-primary--light dark:text-text-primary my-8 dark:bg-weather-primary py-2 px-6 rounded-md duration-150 hover:bg-weather-secondary--light dark:hover:bg-weather-secondary"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Control the duration of Outer modal entering and leaving transition */
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

/* Fade in and fade out */
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

/* Control duration of Inner modal */
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

/* Fade in and fade out */
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
