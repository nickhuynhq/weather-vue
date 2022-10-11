<template>
  <footer class="sticky bottom-0 w-full bg-header py-4">
    <nav
      class="container flex justify-between sm:flex-col md:flex-row items-center gap-6 text-text-primary"
    >
      <div class="items-center gap-6">
        <a
          href="https://github.com/nickhuynhq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="flex items-center gap-3 duration-150  hover:text-text-hover hover:scale-105"
          >
            <i class="fa-brands fa-github sm:text-xl md:text-2xl"></i>
            <p class="sm:text-sm md:text-lg">@nickhuynhq</p>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/nickhuynhq/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="flex items-center gap-3 duration-150  hover:text-text-hover hover:scale-105"
          >
            <i class="fa-brands fa-linkedin sm:text-xl md:text-2xl"></i>
            <p class="sm:text-sm md:text-lg">Nicholas Huynh</p>
          </div>
        </a>
      </div>

      <span
        class="flex gap-2 justify-end items-center sm:text-sm md:text-lg duration-150 text-text-primary hover:scale-105 cursor-pointer"
      >
        <p>Built with</p>
        <i class="fa-brands fa-vuejs text-[#41b883] text-3xl"></i>
        <p>&</p>
        <img
          class="fill-current w-9"
          src="../assets/icons/tailwind-css-icon.svg"
          alt="tailwind"
        />
      </span>
    </nav>
  </footer>
</template>

<script setup></script>
