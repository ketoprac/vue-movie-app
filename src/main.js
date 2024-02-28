import { createApp } from "vue";
import { clerkPlugin } from "vue-clerk/plugin";
import router from "./routes";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueLazyload from "vue-lazyload";

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
  rtl: false,
};

app.use(router);
app.use(Toast, toastOptions);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });
app.use(VueLazyload, {
  preLoad: 1.3,
  error:
    "https://placehold.co/280x420/grey/white?text=Not%20Found&?font=Open%20Sans",
  loading:
    "https://placehold.co/280x420/grey/white?text=Loading...&?font=Open%20Sans",
  attempt: 1,
});

app.mount("#app");
