<template>
  <div id="materia">
    <div class="grid" :style="`background-color: #${randomColor}`" @click="toggleModal">
      <h3>{{ data.name }}</h3>
      <img :src="icon ? icon : randomIcon" alt="Ícone" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalCard",
  props: ["data"],
  data() {
    return {
      icones: [
        "https://png-5.vector.me/files/images/3/5/350819/book_preview",
        "https://www.pinclipart.com/picdir/big/556-5566270_flat-vector-png-download-vector-laptop-icon-png.png",
        "https://i.pinimg.com/originals/6a/34/ba/6a34ba282b3d231a953c95941579abfd.png",
        "https://cdn.pixabay.com/photo/2021/02/12/06/49/globe-6007494_960_720.png",
        "https://cdn-icons-png.flaticon.com/512/628/628283.png",
        "https://cdn-icons-png.flaticon.com/512/199/199347.png",
        "https://cdn-icons-png.flaticon.com/512/1170/1170177.png",
        "https://cdn-icons-png.flaticon.com/512/2103/2103658.png",
        "https://icons-for-free.com/iconfiles/png/512/chat+iphone+mobile+icon-1320166364091979347.png",
        "https://www.ersvp.g12.br/wp-content/uploads/2018/09/device-camera-icon.png",
      ],
    };
  },
  computed: {
    randomColor() {
      return Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    },
    randomIcon() {
      return this.icones[Math.floor(Math.random() * this.icones.length)];
    },
  },
  methods: {
    toggleModal() {
      this.$store.commit("setIsModalVisible", true);
      this.$store.commit("setModalContent", {title: this.data.name, link: this.data.url});
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 80% 20%;
  border-radius: 10px;
  margin: 1%;
  color: white;
  width: auto;
  height: 100%;
  padding: 2%;
}

img {
  width: 100%;
}

h3 {
  color-adjust: 100%;
  text-shadow: 1px 1px 5px black;
}

.grid:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 100%;
  }

  img {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
