<template>
  <div id="login">
    <div class="form">
      <form class="container" @submit.prevent="login">
        <p v-show="message" class="text-danger">{{ message }}</p>
        <br />
        <label for="user">Usuário</label>
        <input
          type="tel"
          id="user"
          v-model="user"
          placeholder="Digite seu usuário"
          maxlength="14"
          @input="cpf_mask"
        />
        <label for="user">Senha</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
        />
        <button type="submit" id="submit_button">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      user: "",
      password: "",
      message: "",
    };
  },
  methods: {
    cpf_mask() {
      const reg = new RegExp("^[0-9]*$");
      const last_char = this.user[this.user.length - 1];

      if (reg.test(last_char)) {
        this.message = null;
        switch (this.user.length) {
          case 3:
            this.user += ".";
            break;
          case 7:
            this.user += ".";
            break;

          case 11:
            this.user += "-";
            break;

          default:
            break;
        }
      } else {
        this.user = this.user.substring(0, this.user.length - 1);
        this.message = "Digite apenas números!";
      }
    },
    login() {
      if (this.user.length < 14) {
        this.message = "CPF inválido!";
      } else {
        this.message = "";
        const button = document.getElementById("submit_button");
        button.disabled = true;
        button.innerText = "Carregando...";

        let data = qs.stringify({
          user: this.clean_user,
          password: this.password,
        });
        let config = {
          method: "post",
          url: "http://localhost:3000/login",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            if (response.data.status === 200) {
              localStorage.setItem("token", response.data.token);
              this.$store.commit("setIsLogged", true);
              this.$router.push("/");
            } else {
              this.message = response.data.message;
              button.disabled = false;
              button.innerText = "Entrar";
            }
          })
          .catch(() => {
            this.message = "Erro ao conectar com o servidor!";
            button.disabled = false;
            button.innerText = "Entrar";
          });
      }
    },
  },
  computed: {
    clean_user() {
      return this.user.replaceAll(".", "").replace("-", "");
    },
  },
  created() {
    document.title = "SIGA++ | Login";

    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
#login {
  width: 80%;
  margin: 0 auto;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin-top: 10%;
}

input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  margin: 2% 0 2% 0;
}

button {
  width: 100%;
  background-color: var(--primary);
  color: white;
  padding: 4%;
  border-radius: 10px;
  border: none;
  margin: 2% 0 2% 0;
}

button:hover {
  background-color: var(--primary-dark);
  cursor: pointer;
}

.text-danger {
  color: tomato;
}

@media (max-width: 768px) {
  #login {
    width: 100%;
  }

  .form {
    margin: 2%;
  }
}
</style>
