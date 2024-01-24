<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;

const movie = ref([]);
const loading = ref(false);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

const fetchMovieDetail = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
    const data = await res.json();
    movie.value = data;
    console.log(movie.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

fetchMovieDetail();
console.log(movie.value);

const getBackdropUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
};

const getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};

</script>

<template>
  <div>
    <img :src="getBackdropUrl(movie.backdrop_path)" />
    <img :src="getPosterUrl(movie.poster_path)" />
  </div>
  <h1 class="text-xl font-bold">{{ movie.title }}</h1>
  <p>{{ movie.overview }}</p>
</template>