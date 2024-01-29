<script setup>
import { ref } from "vue";
import MovieList from "@/components/movie-list.vue";
import MovieListSkeleton from "@/components/movie-list-skeleton.vue";

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
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    const data = await res.json();
    movies.value = data.results;
    console.log(movies.value);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

fetchMovies();
</script>

<template>
  <MovieListSkeleton v-if="loading" />
  <MovieList
    v-if="movies.length > 0 && !loading"
    :movies="movies"
    header="Upcoming"
    :loading="loading"
  />
</template>
