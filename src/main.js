import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
//general
import BaseCard from "./components/general/BaseCard.vue";
import BaseButton from "./components/general/BaseButton.vue";
import BaseBadge from "./components/general/BaseBadge.vue";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseBadge", BaseBadge);
app.use(VueQueryPlugin);
app.use(router);
app.use(store);

app.mount("#app");
