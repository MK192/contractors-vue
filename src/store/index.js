import { createStore } from "vuex";
import contractorsModule from "./modules/contractors";
import requestModule from "./modules/requests";

const store = createStore({
  modules: {
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
