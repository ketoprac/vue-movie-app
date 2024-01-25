<script setup>
import { AlignJustify, Clapperboard, X } from "lucide-vue-next";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

  console.log(router.fullPath);

const showMenu = ref(false);

onMounted(() => {
  console.log(router.fullPath);
});

watch(() => router.fullPath, (newPath) => {
  console.log("Route changed:", newPath);
});

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const routes = [
  {
    title: "Now Playing",
    link: "/"
  },
  {
    title: "Popular",
    link: "/popular"
  },
  {
    title: "Top Rated",
    link: "/top-rated"
  },
  {
    title: "Upcoming",
    link: "/upcoming"
  },
]

</script>

<template>
  <nav class="border-b flex justify-between items-center py-3 lg:px-32 px-6">
    <div class="flex items-center gap-x-2 font-bold text-xl">
      <Clapperboard class="fill-slate-500" />
      <router-link to="/">Vue Movie</router-link>
    </div>
    <div class="lg:flex gap-x-4 hidden lg:visible text-sm">
      <router-link class="py-2" :class="{ 'font-semibold border-b border-black': router.fullPath === route.link }" v-for='route in routes' :to='route.link'>{{ route.title }}</router-link>
    </div>
    <div class="lg:flex items-center gap-x-1 hidden lg:visible">
      <router-link to="/sign-in">
        <button class="text-sm font-semibold text-gray-800 border-2 rounded px-4 py-1">
          Sign In
        </button>
      </router-link>
    </div>
    <!-- Mobile Nav -->
    <div class="lg:hidden">
      <button @click="toggleMenu" class="border rounded p-1 hover:bg-gray-100">
        <AlignJustify v-if="!showMenu" class="w-5 h-5" />
        <X v-else class="w-5 h-5" />
      </button>
    </div>
  </nav>
  <div v-if="showMenu" class="flex flex-col p-3 gap-y-1 bg-gray-50">
    <router-link to="/">Now Playing</router-link>
      <router-link to="/popular">Popular</router-link>
      <router-link to="/top-rated">Top Rated</router-link>
      <router-link to="/upcoming">Upcoming</router-link>
      <router-link to="/sign-in">
        <button class="text-sm font-semibold text-gray-800 border-2 rounded px-4 py-1">
          Sign In
        </button>
      </router-link>
  </div>
</template>
