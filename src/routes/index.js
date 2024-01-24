import { createRouter, createWebHistory } from "vue-router";

const Popular = () => import('@/pages/Popular.vue');
const TopRated = () => import('@/pages/TopRated.vue');
const Upcoming = () => import('@/pages/Upcoming.vue');
const NowPlaying = () => import('@/pages/NowPlaying.vue');
const SignIn = () => import('@/pages/SignIn.vue');
const MovieDetail = () => import('@/pages/MovieDetail.vue');

const routes = [
  { path: '/', component: NowPlaying },
  { path: '/popular', component: Popular },
  { path: '/top-rated', component: TopRated },
  { path: '/upcoming', component: Upcoming },
  { path: '/sign-in', component: SignIn },
  { path: '/movie/:id', component: MovieDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;