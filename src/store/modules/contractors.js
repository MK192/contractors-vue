export default {
  namespaced: true,
  state() {
    return {
      contractors: null,
      testData: [
        {
          id: "c1",
          firstName: "John",
          lastName: "Doe",
          areas: ["plumber", "builder"],
          description:
            "I'm John and I've worked as a contractor plumber and builder for years. Contact me if you are interested!",
          hourlyRate: 40,
        },
        {
          id: "c2",
          firstName: "Michael",
          lastName: "Black",
          areas: ["builder", "electrician"],
          description: "I am Michael and i can work as builder or electrician",
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    registerContractor(state, payload) {
      console.log(payload);
      state.contractors.push(payload);
    },
    setContractors(state, payload) {
      state.contractors = payload;
    },
  },
  actions: {
    async registerContractor(context, data) {
      const userId = context.rootGetters["auth/getUserId"];
      console.log(userId);
      const token = context.rootGetters["auth/getToken"];
      const res = await fetch(
        `https://contractors-56500-default-rtdb.europe-west1.firebasedatabase.app/contractors/${userId}.json?auth=` +
          token,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      const responseData = await res.json();
      if (!res.ok) {
        const message = responseData.error?.message || "Something went wrong.";
        throw new Error(message);
      }

      context.commit("registerContractor", {
        ...data,
      });
    },

    async fetchContractors(context) {
      const res = await fetch(
        `https://contractors-56500-default-rtdb.europe-west1.firebasedatabase.app/contractors.json`
      );
      const responseData = await res.json();
      if (!res.ok) {
        //
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const contractors = [];
      for (const key in responseData) {
        const contractor = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        contractors.push(contractor);
      }
      context.commit("setContractors", contractors);
    },
  },
  getters: {
    getContractors(state) {
      console.log("contractors : ", state.contractors);
      return state.contractors;
    },

    isContractor(_, getters, _2, rootGetters) {
      const contractors = getters.getContractors;
      const userId = rootGetters.userId;
      if (contractors) {
        return contractors.some((contractor) => contractor.id === userId);
      } else {
        return false;
      }
    },
  },
};
