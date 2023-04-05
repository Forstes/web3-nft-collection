<script setup lang="ts">
import router from "@/plugins/router";
import { Bars3Icon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-gray-700">
    <nav class="sticky z-20 border-gray-200 px-4 py-2.5 bg-gray-900">
      <div class="flex flex-wrap items-center justify-between">
        <a class="cursor-pointer">
          <span class="text-xl text-lime-500 font-semibold" @click="router.push('/')">Just NFT Collection</span>
        </a>

        <div class="w-auto cursor-pointer" @click="router.push('/')">
          <Bars3Icon class="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </nav>

    <main class="grow overflow-auto p-2">
      <router-view />
    </main>
  </div>
</template>
