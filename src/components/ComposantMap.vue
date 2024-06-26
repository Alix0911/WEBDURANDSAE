<template>
  <div id="app">
    <div id="map" style="height: 100vh;"></div>
    <div class="map-buttons"></div>
  </div>
</template>


<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 15,
      minZoom: 3, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.loadMarkers();
  },
  methods: {
    async loadMarkers() {
      var MapIcon = L.icon({
        iconUrl: require('@/assets/marqueurcarte.png'),
        iconSize: [38, 38], 
        iconAnchor: [19, 38], 
      });

      var MaPositionIcon = L.icon({
        iconUrl: require('@/assets/marqueurcartemaposition.png'),
        iconSize: [38, 38], 
        iconAnchor: [19, 38], 
      });

      const markermaposition = L.marker([this.lat, this.lng], { icon: MaPositionIcon }).bindPopup(
        `<b>Ma position</b>`
      );
      markermaposition.on('click', this.zoom);
      this.map.addLayer(markermaposition);

      const allData = [];

      try {
        const response = await fetch('http://localhost:1337/api/bicycle-parkings');
        const responseData = await response.json();

        if (responseData && responseData.data) {
          allData.push(...responseData.data);
        } else {
          console.error('Les données récupérées ne sont pas au format attendu.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }

      const markers = L.markerClusterGroup();

      allData.forEach(parking => {
        const marker = L.marker([parking.attributes.Y, parking.attributes.X], { icon: MapIcon }).bindPopup(
          `<b>Infos Parking :</b><br>
          Capacité : ${parking.attributes.capacite} places<br>
          Accès : ${parking.attributes.acces}<br>
          Lumière : ${parking.attributes.lumiere}<br>
          Surveillance : ${parking.attributes.surveillance}<br>
          Gestionnaire : ${parking.attributes.gestionnaire}<br>
          <br><i>Dernière mise à jour le ${parking.attributes.date_maj}</i>`
        );

        markers.addLayer(marker);
      });

      this.map.addLayer(markers);
    },

    zoom() {
      this.map.flyTo([this.lat, this.lng], 15);
    },

    zoomIn() {
      this.map.zoomIn();
    },

    zoomOut() {
      this.map.zoomOut();
    },

    resetZoom() {
      this.map.setView([this.lat, this.lng], 15);
    },
  },
};
</script>

<style scoped>
#map-container {
  position: relative;
  height: 100vh;
  width: 100%;
}

#map {
  height: 100%;
  width: 100%;
}

.map-buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
}

.map-buttons .btn {
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: #A0522D; /* Marron automnal */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.map-buttons .btn:hover {
  background-color: #7E3F2D; /* Marron foncé */
}

.marker-cluster-small div {
  color: #fff !important;
}

.marker-cluster-medium div {
  color: #fff !important;
}

.marker-cluster-large div {
  color: #fff !important;
}
</style>