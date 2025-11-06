let timer;

export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async login(context, payload) {
      await context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    async signup(context, payload) {
      await context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_WEB_API_KEY}`;

      if (mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_WEB_API_KEY}`;
      }
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await res.json();

      if (!res.ok) {
        const message = responseData.error?.message || "Something went wrong.";
        throw new Error(message);
      }
      // convert to miliseconds
      const expiresIn = +responseData.expiresIn * 1000;
      // calculate token expiration time
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("expirationDate", expirationDate);
      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);
      context.commit("setUser", {
        userId: responseData.localId,
        token: responseData.idToken,
      });
    },

    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("expirationDate");

      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);
      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
        });
      }
    },

    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      clearTimeout(timer);
      context.commit("setUser", {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
    },
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
