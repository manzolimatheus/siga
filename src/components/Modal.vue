<template>
  <div id="modal" v-show="isModalVisible">
    <div class="container modal">
      <header>
        <h3>{{ title }}</h3>
        <button @click="closeModal">X</button>
      </header>
      <hr />
      <br />
      <p id="content" v-show="isContentLoaded"></p>
      <p v-show="!isContentLoaded">Carregando...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Modal",
  data() {
    return {
      content: "",
      isContentLoaded: false
    };
  },
  computed: {
    isModalVisible() {
      return this.$store.state.isModalVisible;
    },
    title() {
      return this.$store.state.modalContent.title;
    },
    link() {
      return this.$store.state.modalContent.link;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("setIsModalVisible", false);
    },
    getData() {
      let data = qs.stringify({
        token: localStorage.getItem("token"),
        subject_url: this.link,
      });
      let config = {
        method: "post",
        url: "http://localhost:3000/subject",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          this.isContentLoaded = true
          this.content = response.data.data
          document.querySelector("#content").innerHTML = this.content
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    isModalVisible(newValue) {
      if (newValue) {
        this.getData();
        this.isContentLoaded = false
      }
    },
  },
};
</script>

<style scoped>
#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  width: 50%;
}

header {
  display: grid;
  grid-template-columns: 90% 10%;
}

button {
  color: tomato;
  font-size: 1.5em;
  border: none;
  background-color: transparent;
}

button:hover {
  cursor: pointer;
}

p {
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    margin: 2%;
  }
}
</style>
