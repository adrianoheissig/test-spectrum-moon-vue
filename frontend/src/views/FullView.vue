<template>
  <header-component />
  <main class="container">
    <router-view> </router-view>
  </main>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
export default {
  name: "FullView",
  components: { HeaderComponent },
};
</script>
