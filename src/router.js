import Vue from 'vue';
import Router from 'vue-router';
import Accueil from '@/components/Accueil';
import Geolocalisation from '@/components/Geolocalisation';
import Cartographie from '@/components/Cartographie';
import Donnees from '@/components/Donnees';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Accueil },
    { path: '/geolocalisation', component: Geolocalisation },
    { path: '/cartographie', component: Cartographie },
    { path: '/donnees', component: Donnees },
  ],
});
