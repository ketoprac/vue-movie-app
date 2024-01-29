<script setup>
import { AlignJustify, Clapperboard, X, Heart } from "lucide-vue-next";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuth, UserButton } from "vue-clerk";

const { isSignedIn } = useAuth();

const router = useRoute();

console.log(router.fullPath);

const showMenu = ref(false);

onMounted(() => {
  console.log(router.fullPath);
});

watch(
  () => router.fullPath,
  (newPath) => {
    console.log("Route changed:", newPath);
  }
);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const routes = [
  {
    title: "Now Playing",
    link: "/",
  },
  {
    title: "Popular",
    link: "/popular",
  },
  {
    title: "Top Rated",
    link: "/top-rated",
  },
  {
    title: "Upcoming",
    link: "/upcoming",
  },
];
</script>

<template>
  <nav class="border-b border-gray-600 flex justify-between items-center py-5 lg:px-32 px-6 bg-black text-white">
    <div class="flex items-center gap-x-2 font-bold text-2xl tracking-wide">
      <Clapperboard class="text-gray-900 fill-slate-500" />
      <router-link to="/">Vue <span class="text-green-600">Movie</span></router-link>
    </div>
    <div class="lg:flex gap-x-4 hidden lg:visible text-sm">
      <router-link
        class="py-2 tracking-widest"
        :class="{
          'border-b-2 border-green-600': router.fullPath === route.link,
        }"
        v-for="route in routes"
        :to="route.link"
        >{{ route.title }}</router-link
      >
    </div>
    <div
      v-if="!isSignedIn"
      class="lg:flex items-center gap-x-1 hidden lg:visible"
    >
      <router-link to="/sign-in">
        <button
          class="text-xs font-semibold text-white rounded bg-green-600 px-4 py-2 tracking-wider"
        >
          Sign In
        </button>
      </router-link>
    </div>
    <div v-else class="lg:flex items-center gap-x-2 hidden lg:visible">
      <button afterSignOutUrl="/sign-in" v-if="isSignedIn">
      <Heart class="text-gray-200 fill-red h-6 w-6" />
    </button>
      <router-link to="/profile">
        <button
        class="text-xs font-semibold text-white rounded bg-green-600 px-4 py-2 tracking-wider"
        >
          Profile
        </button>
      </router-link>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
    <!-- Mobile Nav -->
    <div class="lg:hidden">
      <button @click="toggleMenu" class="border border-gray-600 rounded p-1 hover:bg-gray-800">
        <AlignJustify v-if="!showMenu" class="w-5 h-5" />
        <X v-else class="w-5 h-5" />
      </button>
    </div>
  </nav>
  <div v-if="showMenu" class="flex flex-col p-3 gap-y-1 bg-gray-900 text-white">
    <router-link to="/">Now Playing</router-link>
    <router-link to="/popular">Popular</router-link>
    <router-link to="/top-rated">Top Rated</router-link>
    <router-link to="/upcoming">Upcoming</router-link>
    <router-link to="/sign-in" v-if="!isSignedIn">
      <button
        class="text-sm font-semibold border-2 rounded px-4 py-1"
      >
        Sign In
      </button>
    </router-link>
    <div class="flex gap-x-3">
      <button afterSignOutUrl="/sign-in" v-if="isSignedIn">
        <Heart class="text-gray-200 h-6 w-6" />
      </button>
      <UserButton afterSignOutUrl="/sign-in" v-if="isSignedIn"/>
    </div>
  </div>
</template>
