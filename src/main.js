import { createApp } from "vue";
import App from "./App.vue";
import BaseCard from "./components/general/BaseCard.vue";
import BaseButton from "./components/general/BaseButton.vue";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);

app.use(router);
app.use(store);
app.mount("#app");
