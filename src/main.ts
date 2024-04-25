import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});

const firebaseConfig = {
  apiKey: "AIzaSyDD-8EsPr2HOhVJshGw8rXWBKiuPa508Ms",
  authDomain: "project6-wap.firebaseapp.com",
  projectId: "project6-wap",
  storageBucket: "project6-wap.appspot.com",
  messagingSenderId: "291600905610",
  appId: "1:291600905610:web:580dcc8b5af54dcce78473"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
export const db = getFirestore();

const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");

