<script setup>
import { Heart, Star } from "lucide-vue-next";

const props = defineProps(["movies", "header"]);
const { movies, header } = props;

const getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};

const detailId = (id) => {
  return `/movie/${id}`;
};

</script>

<template>
  <h1 class="text-center text-2xl font-bold px-2 pt-6 pb-4 text-white tracking-wider">{{ header }}</h1>
  <ul
    className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-8/12 mx-auto"
  >
    <li
      class="border border-gray-600 mb-2 p-3 shadow hover:bg-gray-900 rounded-xl bg-black text-white"
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
        class="text-lg font-bold cursor-pointer tracking-wider"
        >{{ movie.title }}</a
      >
      <div class="flex justify-between">
        <div class="flex items-center gap-x-1">
          <Star class="fill-yellow-400 text-yellow-400 h-5 w-5" />
          <p>{{ movie.vote_average.toFixed(1) }} / 10</p>
        </div>
        <button>
          <Heart class="text-gray-600 hover:fill-red-500 h-6 w-6" />
        </button>
      </div>
    </li>
  </ul>
</template>
