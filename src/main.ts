import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import router from './router'
import { createPinia } from 'pinia';  // Import Pinia
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";

const pinia= createPinia();

const app = createApp(App, {
  Title: "Brier + ET",
});

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(ToastService);

app.use(router);
app.use(pinia);
app.mount("#app");

// const app = createApp(App);
// createApp(App).mount('#app')
