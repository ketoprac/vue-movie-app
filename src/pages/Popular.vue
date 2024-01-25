<script setup>
import { ref } from "vue";
import MovieList from "@/components/movie-list.vue";

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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
</script>

<template>
  <h1 class="text-center text-3xl font-bold" v-if="loading">Loading...</h1>
  <movie-list v-if="movies.length > 0" :movies="movies" header="Popular" :loading="loading" />
</template>
