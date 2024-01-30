<script setup>
import { ref, onMounted } from "vue";
import MovieList from "@/components/movie-list.vue";
import MovieListSkeleton from "@/components/movie-list-skeleton.vue";

const movies = ref([]);
const loading = ref(true);

onMounted(() => {
  const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  if (savedMovies && Array.isArray(savedMovies)) {
    movies.value = savedMovies;
  }
  loading.value = false;
});
</script>

<template>
  <MovieListSkeleton v-if="loading" />
  <MovieList
    v-if="movies.length > 0 && !loading"
    :movies="movies"
    header="Saved Movies"
    :loading="loading"
  />
</template>
