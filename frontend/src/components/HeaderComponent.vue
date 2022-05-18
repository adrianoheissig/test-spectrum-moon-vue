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
            <button type="button" class="btn btn-link" @click.stop="onMain">
              Home
            </button>
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
          <button type="button" class="btn btn-primary" @click.stop="onSignUp">
            Sign-up
          </button>
        </div>
        <div class="col-md-3 text-end" v-else>
          <button
            type="button"
            class="btn btn-success me-2"
            @click.stop="onProfile"
          >
            Profile
          </button>
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
    onMain() {
      this.$router.push("main");
    },
    onLogin() {
      this.$router.push("login");
    },
    onSignUp() {
      this.$router.push("register");
    },
    onLogout() {
      this.logoutUser();
      this.$router.push("main");
    },
    onProfile() {
      this.$router.push("profile");
    },
  },
};
</script>
