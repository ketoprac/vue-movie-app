import { createRouter, createWebHistory } from "vue-router";

const Popular = () => import("@/pages/Popular.vue");
const TopRated = () => import("@/pages/TopRated.vue");
const Upcoming = () => import("@/pages/Upcoming.vue");
const NowPlaying = () => import("@/pages/NowPlaying.vue");
const SignIn = () => import("@/pages/SignIn.vue");
const SignUp = () => import("@/pages/SignUp.vue");
const MovieDetail = () => import("@/pages/MovieDetail.vue");
const UserProfile = import('@/pages/UserProfile.vue');

const routes = [
  { path: "/", component: NowPlaying, meta: { title: 'Now Playing | Vue Movie'} },
  { path: "/popular", component: Popular },
  { path: "/top-rated", component: TopRated },
  { path: "/upcoming", component: Upcoming },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  { path: "/movie/:id", component: MovieDetail },
  { path: "/profile", component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
