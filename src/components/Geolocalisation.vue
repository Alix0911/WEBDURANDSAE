<template>
  <div>
    <h1>Géolocalisation</h1>
    <div id="header">
    <router-link class="btn" to="/">Accueil</router-link>
    <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
    <router-link class="btn" to="/cartographie">Cartographie</router-link>
    <router-link class="btn" to="/donnees">Données</router-link>
    </div>
    <button class="btn" @click="getLocation">Obtenir la position</button>
    <p>Latitude: {{ latitude }}</p>
    <p>Longitude: {{ longitude }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      }
    },
  },
};
</script>
