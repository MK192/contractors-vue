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

      const res = await fetch(
        `https://contractors-56500-default-rtdb.europe-west1.firebasedatabase.app/request/${payload.contractorId}.json`,

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
  },
  getters: {},
};
