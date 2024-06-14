<template>
  <div class="cartography">
    <div class="navbar">
      <router-link class="btn" to="/">Accueil</router-link>
      <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
      <router-link class="btn" to="/cartographie">Cartographie</router-link>
      <router-link class="btn" to="/donnees">Données</router-link>
    </div>
    <h1>Cartographie</h1>
    <ComposantMap :lat="49.871144" :lng="2.2641492"/>
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
.cartography {
  background-color: #F5F5F5; /* Blanc cassé */
  height: 100vh;
  flex-direction: column;
  align-items: center;
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

h1 {
  color: #333333; /* Gris foncé */
  margin: 20px 0;
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

