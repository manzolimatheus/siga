<template>
  <div class="home">
    <div class="grid">
      <div>
        <div class="profile container">
          <div v-if="isContentLoaded">
            <div class="profile-photo">
              <img
                :src="
                  content.profile_picture ===
                  'https://siga.cps.sp.gov.br/image//padrao.jpg'
                    ? 'https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500.jpg'
                    : content.profile_picture
                "
                alt="Imagem de perfil"
              />
              <h3>{{ content.name }}</h3>
            </div>
            <hr />
            <p>
              <ion-icon name="id-card-outline"></ion-icon> RA:
              <strong>{{ content.ra }}</strong>
            </p>
            <p>
              <ion-icon name="mail-outline"></ion-icon> E-mail:
              <strong>{{ content.email }}</strong>
            </p>
            <p>
              <ion-icon name="time-outline"></ion-icon> Semestre atual:
              <strong>{{ content.cicle }}</strong>
            </p>
          </div>
          <div v-else>
            <div>Carregando...</div>
          </div>
        </div>
        <br />
        <a :href="content.banner.url" target="blank" v-if="isContentLoaded">
          <img :src="content.banner.image" alt="Banner" class="rounded" />
        </a>
      </div>
      <div>
        <div class="container">
          <div class="progression" v-if="isContentLoaded">
            <div>
              <h3>Progresso</h3>
              <h1 style="color: cornflowerblue">
                <ion-icon name="bar-chart-outline"></ion-icon>
              </h1>
              <h1>{{ content.yield.progression }}%</h1>
            </div>
            <div>
              <h3>Média atual</h3>
              <h1 style="color: green">
                <ion-icon name="checkmark-circle"></ion-icon>
              </h1>
              <h1>{{ content.yield.average_grade }}</h1>
            </div>
            <div>
              <h3>Maior média</h3>
              <h1 style="color: orange"><ion-icon name="trophy"></ion-icon></h1>
              <h1>{{ content.yield.highest_average_grade }}</h1>
            </div>
          </div>
          <p v-else>Carregando...</p>
        </div>
        <br />
        <div class="container">
          <div v-if="isContentLoaded">
            <h2>Suas matérias</h2>
            <div class="materias">
              <HorizontalCard
                v-for="(school_subject, index) in content.school_subjects"
                :key="index"
                :data="school_subject"
              />
            </div>
          </div>
          <p v-else>Carregando...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalCard from "@/components/HorizontalCard.vue";
import axios from "axios";
import qs from "qs";

export default {
  name: "Home",
  components: {
    HorizontalCard,
  },
  data() {
    return {
      content: [],
      isContentLoaded: false,
    };
  },
  methods: {
    getData() {
      let data = qs.stringify({
        token: localStorage.getItem("token"),
      });
      let config = {
        method: "post",
        url: "http://localhost:3000/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          this.content = response.data.data;
          this.isContentLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }

    document.title = "SIGA++ | Home";
  },
};
</script>

<style scoped>
.home {
  width: 80%;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 1rem;
  padding: 1rem;
}

hr {
  width: 50%;
  margin: 4% auto;
}

h2 {
  padding: 1rem;
}

strong {
  white-space: pre-wrap;
}

.profile {
  padding: 6%;
}

.profile-photo {
  width: 100%;
  text-align: center;
}

.profile-photo img {
  width: 70%;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.materias {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
}

.progression {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .home {
    width: 100%;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
