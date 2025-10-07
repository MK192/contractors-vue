export default {
  namespaced: true,
  state() {
    return {
      contractors: [
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
  mutations: {},
  actions: {},
  getters: {
    getContractors(state) {
      return state.contractors;
    },
  },
};
