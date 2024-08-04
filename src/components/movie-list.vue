<script setup>
import { useAuth } from "vue-clerk";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Heart, Star } from "lucide-vue-next";

const router = useRouter();
const toast = useToast();
const { isSignedIn } = useAuth();

const props = defineProps(["movies", "header"]);
const { movies, header } = props;

const getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};

const getBackdropUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
};

const detailId = (id) => {
  return `/movie/${id}`;
};

let savedMovies = JSON.parse(localStorage.getItem("saved-movies")) || [];

const saveMovie = (movie) => {
  if (!isSignedIn.value) {
    return router.push("/sign-in");
  }

  const { id, title, poster_path, vote_average } = movie;
  const payload = { id, title, poster_path, vote_average };

  const movieExists = savedMovies.some((savedMovie) => savedMovie.id === id);

  if (movieExists) {
    // Remove movie from savedMovies
    savedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== id);
    localStorage.setItem("saved-movies", JSON.stringify(savedMovies));
    toast.success("Removed");
  } else {
    // Add movie to savedMovies
    savedMovies.push(payload);
    localStorage.setItem("saved-movies", JSON.stringify(savedMovies));
    toast.success("Saved");
  }
};

const isMovieSaved = (id) => {
  return savedMovies.some((movie) => movie.id === id);
};

const randomNumber = Math.floor(Math.random()*10);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div>
    <img :src="getBackdropUrl(movies[randomNumber].backdrop_path)" />
  </div>
  <h1
    class="text-center text-3xl font-bold px-2 pt-6 pb-2 text-[#212121] tracking-wider"
  >
    {{ header }}
  </h1>
  <div
    class="w-24 h-1 bg-gradient-to-r from-green-600 to-sky-500 mx-auto mb-4"
  ></div>
  <ul
    className="p-0 md:p-1 lg:p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-8/12 mx-auto"
  >
    <li
      class=" mb-2 p-5 rounded-[30px] bg-[#FAFAFA] shadow text-[#212121]"
      v-if="movies"
      v-for="movie in movies"
      :key="movie.id"
    >
      <img
        className="mx-auto mb-2"
        v-lazy="getPosterUrl(movie.poster_path)"
        :alt="movie.title"
      />
      <a
        :href="detailId(movie.id)"
        class="text-lg font-bold cursor-pointer tracking-wider"
        >{{ movie.title }}</a
      >
      <div class="flex justify-between">
        <div class="flex items-center gap-x-1">
          <Star class="fill-yellow-400 text-yellow-400 h-5 w-5" />
          <p>{{ movie.vote_average.toFixed(1) }} / 10</p>
        </div>
        <button @click="saveMovie(movie)">
          <Heart
            class="text-gray-50 hover:fill-red-500 h-6 w-6"
            :class="{ 'fill-red-500': isMovieSaved(movie.id) }"
          />
        </button>
      </div>
    </li>
    <li v-if="!movies">
      <p>Still Empty</p>
    </li>
  </ul>
</template>
