<template>
  <div id="footer">
      <footer>
          <p>Versão desenvolvida por Matheus Manzoli - {{ actualYear }}</p>
      </footer>
  </div>
</template>

<script>
export default {
    name: "Footer",
    computed: {
        actualYear() {
            return new Date().getFullYear();
        }
    }
}
</script>

<style scoped>
footer{
    background-color: var(--primary);
    text-align: center;
    padding: 10px;
    color: white;
}
</style>