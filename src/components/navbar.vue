<script setup>
import { AlignJustify, Clapperboard, X, Heart } from "lucide-vue-next";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuth, UserButton } from "vue-clerk";

const { isSignedIn } = useAuth();

const router = useRoute();

const showMenu = ref(false);
const moviesCount = ref(0);

onMounted(() => {
  const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  if (savedMovies && Array.isArray(savedMovies)) {
    moviesCount.value = savedMovies.length;
  }
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
  <nav
    class="border-b border-gray-600 flex justify-between items-center py-5 lg:px-32 px-6 bg-black text-white"
  >
    <div class="flex items-center gap-x-2 font-bold text-2xl tracking-wide">
      <Clapperboard class="text-gray-900 fill-slate-500" />
      <router-link to="/"
        >Vue <span class="text-green-600">Movie</span></router-link
      >
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
    <div v-else class="lg:flex items-center gap-x-4 hidden lg:visible">
      <router-link to="/saved" v-if="isSignedIn">
        <div className="flex">
          <Heart  class="text-gray-200 fill-red h-6 w-6"/>
          <div className="flex items-center justify-center -ml-2 bg-green-600 text-white text-center font-bold rounded-full w-3 h-3 text-[8px]">
            {{ moviesCount }}
          </div>
        </div>
      </router-link>
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
      <button
        @click="toggleMenu"
        class="border border-gray-600 rounded p-1 hover:bg-gray-800"
      >
        <AlignJustify v-if="!showMenu" class="w-5 h-5" />
        <X v-else class="w-5 h-5" />
      </button>
    </div>
  </nav>
  <div
    v-if="showMenu"
    class="lg:hidden flex flex-col py-3 px-5 gap-y-1 bg-gray-900 text-white"
  >
    <router-link to="/">Now Playing</router-link>
    <router-link to="/popular">Popular</router-link>
    <router-link to="/top-rated">Top Rated</router-link>
    <router-link to="/upcoming">Upcoming</router-link>
    <router-link to="/profile" v-if="isSignedIn">
        <button
          class="text-xs font-semibold text-white rounded bg-green-600 px-4 py-2 tracking-wider"
        >
          Profile
        </button>
      </router-link>
    <router-link to="/sign-in" v-if="!isSignedIn">
        <button
          class="text-xs font-semibold text-white rounded bg-green-600 px-4 py-2 tracking-wider"
        >
          Sign In
        </button>
      </router-link>
    <div class="flex items-center gap-x-3">
      <router-link to="/saved" v-if="isSignedIn">
        <div className="flex">
          <Heart  class="text-gray-200 fill-red h-6 w-6"/>
          <div className="flex items-center justify-center -ml-2 bg-green-600 text-white text-center font-bold rounded-full w-3 h-3 text-[8px]">
            {{ moviesCount }}
          </div>
        </div>
      </router-link>

      <UserButton afterSignOutUrl="/sign-in" v-if="isSignedIn" />
    </div>
  </div>
</template>
