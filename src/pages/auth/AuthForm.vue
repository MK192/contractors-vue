<template>
  <div>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password</p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
  <p v-if="error">{{ error }}</p>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Sign up instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (!this.email.includes("@") || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      try {
        /* we have url with query param redirect if user click on login button from
          CoachesList page. Redirect is different when user open form from nav login button
          and when user comeS to login page from CoachesList*/
        const redirectUrl = "/" + (this.$route.query.redirect || "contractors");
        if (this.mode === "login") {
          await this.$store.dispatch("auth/login", {
            email: this.email,
            password: this.password,
          });

          this.$router.replace(redirectUrl);
        } else {
          await this.$store.dispatch("auth/signup", {
            email: this.email,
            password: this.password,
          });

          this.$router.replace(redirectUrl);
        }
      } catch (error) {
        this.error = error.message || "Form submit unsuccessful.";
      }
    },

    switchMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  color: white;
  padding: 1rem;
}

.form-control {
  margin: 0.8rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  background-color: #424242;
  border: 1px solid #363636;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: rgb(235, 227, 227);
  background-color: #424242;
  outline: none;
}
</style>
