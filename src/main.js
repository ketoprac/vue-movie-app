import { createApp } from "vue";
import { clerkPlugin } from 'vue-clerk/plugin';
import router from "./routes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

import "./assets/style.css";
import "./assets/font.css";

import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.mount("#app");