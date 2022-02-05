<template>
  <header>
    <img src="http://siga.cps.sp.gov.br/aluno/Resources/logosiga.png" alt="Logo SIGA" class="logo">
    <nav>
      <router-link :to="isLogged? '/' : '/login'">
        <ion-icon name="home-outline"></ion-icon> Início</router-link
      >
      <a href="#" @click="logout" v-show="isLogged"><ion-icon name="log-out-outline"></ion-icon> Sair</a>
    </nav>
    <div class="alert">
      <p>Esta versão se encontrada em estado de desenvolvimento inicial e pode apresentar falhas durante seu uso, considere como um protótipo.</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods:{
    logout(){
      localStorage.removeItem("token");
      this.$store.commit("setIsLogged", false);
      location.reload();
    }
  },
  computed:{
    isLogged(){
      return this.$store.state.isLogged || localStorage.getItem("token") != null? true : false;
    }
  }
};
</script>

<style scoped>
header {
  background-color: #f5f5f5;
  text-align: center;
}

.logo{
  width: 200px;
  margin: 20px auto;
}

nav {
  background-color: var(--primary);
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

nav a {
  color: white;
}

.alert{
  background-color: #ff7979;
  color: white;
  padding: 1%;
}
</style>
