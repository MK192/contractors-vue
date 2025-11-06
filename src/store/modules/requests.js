export default {
  namespaced: true,

  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async addRequest(context, payload) {
      const newRequest = {
        requestID: new Date().toISOString(),
        contractorsId: payload.contractorId,
        email: payload.email,
        message: payload.message,
      };
      const token = context.rootGetters["auth/getToken"];
      const res = await fetch(
        `https://contractors-56500-default-rtdb.europe-west1.firebasedatabase.app/request/${payload.contractorId}.json?auth=${token}`,

        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );
      const responseData = await res.json();

      if (!res.ok) {
        const error = new Error(responseData.message || "Failed to fetch data");
        throw error;
      }

      context.commit("addRequest", newRequest);
    },

    async fetchRequests(context) {
      const userId = context.rootGetters["auth/getUserId"];

      if (!userId) {
        throw new Error("User is not authenticated");
      }
      const token = context.rootGetters["auth/getToken"];
      const res = await fetch(
        `https://contractors-56500-default-rtdb.europe-west1.firebasedatabase.app/request/${userId}.json?auth=${token}`
      );
      const responseData = await res.json();
      if (!res.ok) {
        //
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      // it returns object for each user, so we need to create array to group and store data from each request
      const requests = Object.values(responseData);
      context.commit("setRequests", requests);
    },
  },
  getters: {
    getRequest() {
      return this.requests;
    },
  },
};
