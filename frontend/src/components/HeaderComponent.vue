<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Spectrum Moon</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <div class="col-md-3 text-end" v-if="!loggedIn">
          <button
            type="button"
            class="btn btn-outline-primary me-2"
            @click.stop="onLogin"
          >
            Login
          </button>
          <button type="button" class="btn btn-primary">Sign-up</button>
        </div>
        <div class="text-end" v-else>
          <button type="button" class="btn btn-danger" @click.stop="onLogout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeaderComponent",
  data() {
    return {
      loggedIn: this.$store.state.user || false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  watch: {
    getUser(val) {
      this.loggedIn = val || false;
    },
  },

  methods: {
    ...mapActions(["logoutUser"]),
    onLogin() {
      this.$router.push("login");
    },
    onSignUp() {},
    onLogout() {
      this.logoutUser();
    },
  },
};
</script>
