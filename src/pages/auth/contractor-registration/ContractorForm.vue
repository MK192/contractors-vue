<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">FirstName</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.value"
        @blur="clearValidity('firstname')"
      />
      <p v-if="!firstname.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">LastName</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.value"
        @blur="clearValidity('lastname')"
      />
      <p v-if="!lastname.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <p v-if="!lastname.isValid">Description must not be empty.</p>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.trim="rate.value"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater then 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="builder"
          value="builder"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="builder">Builder</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="electrician"
          value="electrician"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="electrician">Electrician</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="plumber"
          value="plumber"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="plumber">Plumber</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix errors</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
export default {
  emits: ["submit-data"],
  data() {
    return {
      firstname: {
        value: "",
        isValid: true,
      },
      lastname: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.firstname.value === "") {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.value === "") {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        firstName: this.firstname.value,
        lastName: this.lastname.value,
        description: this.description.value,
        hourlyRate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit("submit-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
  color: white;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #c9bcdb;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: rgb(196, 12, 12);
}

.invalid input,
.invalid textarea {
  border: 1px solid rgb(196, 12, 12);
}
</style>
