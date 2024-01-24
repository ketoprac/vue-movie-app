import { createApp } from "vue";
import router from "./routes";

import "./assets/style.css";
import "./assets/font.css";

import App from "./App.vue";

createApp(App).use(router).mount("#app");