<template>
  <main class="form-signup w-100 m-auto mt-4">
    <form>
      <div class="text-center">
        <img
          class="mb-4 image-center"
          src="https://t4.ftcdn.net/jpg/01/88/03/15/360_F_188031593_atBR8ETgySqpXRHTdmOoDCLhONEx3xhT.jpg"
          alt=""
          width="72"
          height="57"
        />
      </div>
      <h1 class="h3 mb-3 fw-normal text-center">Register</h1>
      <h1 class="alert alert-danger h6 mb-2 fw-bold" v-if="msgError">
        {{ msgError }}
      </h1>
      <h1 class="alert alert-success h6 mb-2 fw-bold" v-if="msgSuccess">
        {{ msgSuccess }}
      </h1>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Name Lastname"
          v-model="name"
          autocomplete="true"
        />
        <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
          autocomplete="true"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          autocomplete="true"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="confirmPassword"
          autocomplete="true"
        />
        <label for="floatingPassword">Confirm Password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="button"
        @click.stop="onRegister"
        :disabled="disableButton"
      >
        Register
      </button>
    </form>
  </main>
</template>

<script>
import api from "../api";
export default {
  name: "RegisterView",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      msgError: null,
      msgSuccess: null,
      disableButton: false,
    };
  },
  methods: {
    onRegister() {
      this.disableButton = true;
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      api
        .post("/register", data)
        .then(
          (res) => {
            this.msgError = null;
            this.msgSuccess = res.data.msg;
            setTimeout(() => {
              this.$router.push("main");
            }, 1500);
          },
          (err) => {
            this.msgSuccess = null;
            if (err.response.data.msg) {
              this.msgError = err.response.data.msg;
            } else {
              this.msgError = err.message;
            }
          }
        )
        .finally(() => (this.disableButton = false));
    },
  },
};
</script>

<style scoped>
.form-signup {
  max-width: 330px;
  padding: 15px;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signup input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
