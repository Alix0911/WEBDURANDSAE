<template>
  <div>
    <nav class="navbar">
      <router-link class="btn" to="/">Accueil</router-link>
      <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
      <router-link class="btn" to="/cartographie">Cartographie</router-link>
      <router-link class="btn" to="/donnees">Données</router-link>
    </nav>
    <header class="header">
      <h1>Géolocalisation</h1>
      <p>Découvrez votre position actuelle</p>
    </header>
    <main class="main-content">
      <button class="btn-primary" @click="getLocation">Obtenir la position</button>
      <div class="location-info">
        <p v-if="latitude && longitude">Latitude: {{ latitude }}</p>
        <p v-if="latitude && longitude">Longitude: {{ longitude }}</p>
        <p v-else>Cliquez sur le bouton pour obtenir votre position.</p>
      </div>
    </main>
    <footer class="footer">
      <p>&copy; 2024 Géolocalisation App. Tous droits réservés.</p>
    </footer>
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

<style>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: rgba(90, 109, 124, 0.8);
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.navbar .btn {
  font-weight:bold;
  color: #000;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border: 2px solid transparent;
  transition: background-color 0.3s, border-color 0.3s;
}

.navbar .btn:hover {
  background-color: #7EBE45; /* Vert herbe */
  border-color: white;
}

.header {
  text-align: center;
  padding: 50px 20px;
  color: #000;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 300;
}

.header p {
  margin: 10px 0 0;
  font-size: 1.2rem;
}

.main-content {
  padding: 40px 20px;
  text-align: center;
}

.main-content .btn-primary {
  display: inline-block;
  margin: 20px 0;
  padding: 12px 24px;
  background-color: rgba(90, 109, 124, 0.9);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.main-content .btn-primary:hover {
  background-color: #7EBE45;
}

.location-info p {
  margin: 15px 0;
  font-size: 1.1rem;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: rgba(90, 109, 124, 0.9);
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
