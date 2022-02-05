<template>
  <Modal/>
  <Header />
  <router-view />
  <br>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Modal,
    Footer
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  --primary: #0099ff;
  --primary-dark: #0281d6;
}

a {
  text-decoration: none;
}

body {
  background-color: #ececec;
}

.container {
  background-color: white;
  padding: 2%;
  border-radius: 10px;
  width: auto;
  height: fit-content;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

img {
  width: 100%;
}

.my {
  margin: 2% 0 2% 0;
}

.rounded {
  border-radius: 10px;
}
</style>
