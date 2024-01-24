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
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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
  <div v-if="loading">Loading...</div>
  <movie-list v-if="movies.length > 0" :movies="movies" header="Top Rated" />
</template>
