<template>
  <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div class="card p-4">
      <div
        class="image d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn btn-secondary">
          <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
        </button>
        <span class="name mt-3">{{ name }}</span>
        <span class="idd">{{ email }}</span>
        <div
          class="d-flex flex-row justify-content-center align-items-center gap-2"
        >
          <span class="idd1">{{ id }}</span>
          <span><i class="fa fa-copy"></i></span>
        </div>

        <div class="px-2 rounded mt-4 date">
          <span class="join">Joined {{ createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "LoginView",
  data() {
    return {
      id: null,
      name: null,
      email: null,
      createdAt: null,
    };
  },
  methods: {
    getUserInformation() {
      const user = this.$store.state.user;
      if (!user) {
        localStorage.removeItem("userKey");
        delete api.defaults.headers.common.Authorization;
        this.$router.push("login");
      }
      api.get(`/user/${user.userId}`).then((res) => {
        if (res.data && res.data.length > 0) {
          const user = res.data[0];
          this.id = user.userId;
          this.name = user.name;
          this.email = user.email;
          this.createdAt = user.createdAt;
        }
      });
    },
  },
  mounted() {
    this.getUserInformation();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #000;
}

.card {
  width: 350px;
  background-color: #efefef;
  border: none;
  cursor: pointer;
  transition: all 0.5s;
}

.image img {
  transition: all 0.5s;
}

.card:hover .image img {
  transform: scale(1.5);
}

.btn {
  height: 140px;
  width: 140px;
  border-radius: 50%;
}

.name {
  font-size: 22px;
  font-weight: bold;
}

.idd {
  font-size: 14px;
  font-weight: 600;
}

.idd1 {
  font-size: 12px;
}

.number {
  font-size: 22px;
  font-weight: bold;
}

.follow {
  font-size: 12px;
  font-weight: 500;
  color: #444444;
}

.btn1 {
  height: 40px;
  width: 150px;
  border: none;
  background-color: #000;
  color: #aeaeae;
  font-size: 15px;
}

.text span {
  font-size: 13px;
  color: #545454;
  font-weight: 500;
}

.icons i {
  font-size: 19px;
}

hr .new1 {
  border: 1px solid;
}

.join {
  font-size: 14px;
  color: #a0a0a0;
  font-weight: bold;
}

.date {
  background-color: #ccc;
}
</style>
