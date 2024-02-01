import { createApp } from "vue";
import { clerkPlugin } from 'vue-clerk/plugin';
import router from "./routes";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

import "./assets/style.css";
import "./assets/font.css";

import App from "./App.vue";

const app = createApp(App);

const toastOptions = {
  position: "top-right",
  timeout: 3010,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
}

app.use(router);
app.use(Toast, toastOptions);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.mount("#app");