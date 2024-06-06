<template>
  <div id="header">
    <router-link class="btn" to="/">Accueil</router-link>
    <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
    <router-link class="btn" to="/cartographie">Cartographie</router-link>
    <router-link class="btn" to="/donnees">Données</router-link>
    <ComposantMap :lat="49.871144" :lng="2.2641492"/>
  </div>
</template>

<script>
import ComposantMap from './ComposantMap';

export default {
  components: { ComposantMap },
};
</script>

<style>

</style>
