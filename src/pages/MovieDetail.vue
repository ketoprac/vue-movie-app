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
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`,
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

const getGenres = (genres) => {
  return genres.map((genre) => genre.name).toString();
};
</script>

<template>
  <div class="mx-32">
    <div
      class="w-full bg-auto bg-no-repeat bg-center rounded-3xl overflow-hidden"
      :style="{
        'background-image':
          'url(https://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')',
      }"
    >
      <div class="p-12 backdrop-blur" style="background: rgba(0, 0, 0, 0.65)">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="grow-0 shrink-0 self-center">
            <div
              class="group relative overflow-hidden bg-content3 dark:bg-content2 before:opacity-100 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-content4/30 before:bg-gradient-to-r before:from-transparent before:via-content4 dark:before:via-default-700/10 before:to-transparent after:opacity-100 after:absolute after:inset-0 after:-z-10 after:bg-content3 dark:after:bg-content2 data-[loaded=true]:bg-transparent data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none data-[loaded=true]:after:opacity-0 transition-background !duration-300 before:transition-opacity before:!duration-300 rounded-2xl h-[384px] !bg-transparent"
              data-loaded="true"
            >
              <div
                class="opacity-0 group-data-[loaded=true]:opacity-100 transition-opacity motion-reduce:transition-none !duration-300"
              >
                <div
                  class="relative shadow-black/5 shadow-none rounded-large"
                  style="max-width: fit-content"
                >
                  <img
                    :src="getPosterUrl(movie.poster_path)"
                    class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large w-64 shadow-2xl"
                    :alt="movie.title"
                    data-loaded="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="py-4 !text-white w-full">
            <div class="flex gap-x-3 items-center">
              <h1 class="text-3xl font-bold mb-1">
                {{ movie.title }}
                <span class="font-normal"
                  >({{ movie.release_date.slice(0, 4) }})</span
                >
              </h1>
              <button
                class="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-small px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors motion-reduce:transition-none bg-default text-default-foreground min-w-unit-8 w-unit-8 h-unit-8 z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased"
                type="button"
                aria-expanded="false"
                title="Rate movie"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
                  ></path>
                </svg>
              </button>
            </div>
            <p>
              <span>{{ movie.release_date }}</span
              ><span class="px-2">•</span
              ><span>{{ getGenres(movie.genres) }}</span
              ><span class="px-2">•</span><span>{{ movie.runtime }}m</span>
            </p>
            <p class="font-bold text-xl mt-8 mb-2">Overview</p>
            <p>
              {{ movie.overview }}
            </p>
            <div class="flex flex-col md:flex-row gap-y-6 gap-x-32 mt-8">
              <div>
                <p class="font-bold">Nia DaCosta</p>
                <p>Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
