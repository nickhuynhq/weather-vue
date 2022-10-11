<template>
    <header class="fixed bottom-0 left-0 w-full bg-header py-6">
      <nav
        class="container flex justify-center sm:flex-row items-center gap-6 text-text-primary "
      >
        <a href="https://github.com/nickhuynhq" target="_blank" rel="noopener noreferrer" >
            <div class="flex items-center gap-3 duration-150 hover:text-text-hover hover:scale-105">
                <i class="fa-brands fa-github text-2xl"></i>
                <p class="text-xl">@nickhuynhq</p>
            </div>
        </a>
        <a href="https://www.linkedin.com/in/nickhuynhq/" target="_blank" rel="noopener noreferrer" >
            <div class="flex items-center gap-3 duration-150 hover:text-text-hover hover:scale-105">
                <i class="fa-brands fa-linkedin text-2xl"></i>
                <p class="text-xl">Nicholas Huynh</p>
            </div>
        </a>
        
      </nav>
      <span
          class="flex gap-2 justify-center items-center mt-2 text-xl duration-150 text-text-primary hover:scale-105 cursor-pointer"
        >
          <p>Built with</p>
          <i class="fa-brands fa-vuejs text-[#41b883] text-3xl"></i>
          <p>&</p>
          <img class="fill-current w-9" src="../assets/icons/tailwind-css-icon.svg" alt="tailwind"/>
          
          
        </span>
    </header>
  </template>
  
  <script setup>

  </script>