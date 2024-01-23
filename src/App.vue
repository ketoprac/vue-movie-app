<script setup>
import { ref, onMounted } from "vue";
import { Bookmark, Heart } from 'lucide-vue-next';

const movies = ref([]);
const loading = ref(false);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

const fetchMovies = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    const data = await res.json();
    movies.value = data.results;
    console.log(movies.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

fetchMovies();

const getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};
</script>

<template>
  <nav class="border-b flex justify-between text-lg font-bold py-3 px-12">
    <a href="#">Vue Movie</a>
    <Bookmark class="hover:fill-gray-950 cursor-pointer"/>
  </nav>
  <!-- <div className="text-xl md:text-3xl lg:text-5xl text-white font-semibold flex items-center justify-center mt-8 h-64 bg-gradient-to-b from-gray-900 to-gray-600">
        Now Playing
      </div> -->
  <ul className="p-3 grid grid-cols-3 gap-3 w-8/12 mx-auto">
    <li class="border mb-2 p-3 shadow" v-for="movie in movies">
      <img
        className="mx-auto hover:scale-105 transition-all"
        :src="getPosterUrl(movie.poster_path)"
        :alt="movie.title"
      />
      <h1 class="text-2xl font-semibold">{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <button class="self-end"><Heart class="text-gray-900 hover:fill-red-500"/></button>
    </li>
  </ul>
</template>
