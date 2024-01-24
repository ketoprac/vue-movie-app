<script setup>
import { Heart, Star } from "lucide-vue-next";

const props = defineProps(["movies", "header"]);

const getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};

const detailId = (id) => {
  return `/movie/${id}`;
};
</script>

<template>
  <h1>{{ header }}</h1>
  <ul
    className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-8/12 mx-auto"
  >
    <li
      class="border mb-2 p-3 shadow hover:bg-gray-100"
      v-for="movie in movies"
    >
      <img
        className="mx-auto mb-2"
        :src="getPosterUrl(movie.poster_path)"
        :alt="movie.title"
      />
      <a
        target="_blank"
        :href="detailId(movie.id)"
        class="text-xl font-bold cursor-pointer"
        >{{ movie.title }}</a
      >
      <p class="text-gray-600 text-sm">{{ movie.overview }}</p>
      <div class="flex justify-between">
        <div class="font-bold flex items-center gap-x-1">
          <Star class="fill-yellow-400 text-yellow-400 h-4 w-5" />
          <p>{{ movie.vote_average.toFixed(1) }} / 10</p>
        </div>
        <button>
          <Heart class="text-gray-900 hover:fill-red-500 h-4 w-5" />
        </button>
      </div>
    </li>
  </ul>
</template>
