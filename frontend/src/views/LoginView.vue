<template>
  <main class="form-signin w-100 m-auto mt-4">
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
      <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
      <h1 class="alert alert-danger h6 mb-2 fw-bold" v-if="msg">{{ msg }}</h1>
      <div class="form-floating">
        <input
          ty
          pe="email"
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

      <button
        class="w-100 btn btn-lg btn-primary"
        type="button"
        @click.stop="onSignIn"
        :disabled="disableButton"
      >
        Sign in
      </button>
    </form>
  </main>
</template>

<script>
import api from "../api";
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      email: null,
      password: null,
      msg: null,
      disableButton: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    onSignIn() {
      this.disableButton = true;
      const data = {
        email: this.email,
        password: this.password,
      };
      api
        .post("/login", data)
        .then(
          (res) => {
            this.loginUser(res.data);
            this.$router.push("main");
          },
          (err) => {
            if (err.response.data.msg) {
              this.msg = err.response.data.msg;
            } else {
              this.msg = err.message;
            }
          }
        )
        .finally(() => (this.disableButton = false));
    },
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
