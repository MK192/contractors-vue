import { createStore } from "vuex";
import contractorsModule from "./modules/contractors";
import requestModule from "./modules/requests";
import authModule from "./modules/auth";
const store = createStore({
  modules: {
    auth: authModule,
    contractors: contractorsModule,
    requests: requestModule,
  },
  state() {
    return {
      userId: "c1",
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
  },
});
export default store;
