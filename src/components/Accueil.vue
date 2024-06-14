<template>
  <div class="home">
    <div class="overlay"></div>
    <nav class="navbar">
      <router-link class="btn" to="/">Accueil</router-link>
      <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
      <router-link class="btn" to="/cartographie">Cartographie</router-link>
      <router-link class="btn" to="/donnees">Données</router-link>
    </nav>
    <div class="content">
      <h1>Bienvenue sur notre site de stationnement pour vélos</h1>
      <p>Explorez les options de stationnement pour vélos dans votre ville.</p>
      <router-link class="btn primary" to="/cartographie">Voir la carte</router-link>
    </div>
    <footer class="footer">
      <p>&copy; 2024 Géolocalisation App. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
import ComposantMap from './ComposantMap';

export default {
  components: { ComposantMap },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url('../assets/image_parking_velo.jpg');
  background-size: cover;
  background-position: center;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: rgba(90, 109, 124, 0.8); /* Bleu/gris de la structure métallique */
  padding: 10px;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
}

.navbar .btn {
  font-weight: bold;
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

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  z-index: 1;
}

h1 {
  font-size: 3em;
  margin: 0;
  color : #FFF;
}

p {
  font-size: 1.5em;
}

.btn.primary {
  background-color: #A0522D; /* Marron automnal */
  border: none;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
  border-radius: 5px;
  color: white;
  text-decoration: none;
}


.btn.primary:hover {
  background-color: #7EBE45; /* Vert herbe */
}

.footer {
  text-align: center;
  padding: 10px 20px; /* Reduced padding for a more compact look */
  background-color: rgba(90, 109, 124, 0.9);
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0.6em; /* Reduced font size */
  z-index: 2; /* Ensures the footer is above other elements */
}
</style>