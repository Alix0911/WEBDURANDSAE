<template>
  <div>
    <nav class="navbar">
      <router-link class="btn" to="/">Accueil</router-link>
      <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
      <router-link class="btn" to="/cartographie">Cartographie</router-link>
      <router-link class="btn" to="/donnees">Données</router-link>
    </nav>
    <h1>Données</h1>
    <input v-model="searchQuery" class="search-bar" placeholder="Rechercher..." />

    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('X')">X</th>
          <th @click="sortBy('Y')">Y</th>
          <th @click="sortBy('code_com')">Code Com</th>
          <th @click="sortBy('capacite')">Capacité</th>
          <th @click="sortBy('acces')">Accès</th>
          <th @click="sortBy('lumiere')">Lumière</th>
          <th @click="sortBy('surveillance')">Surveillance</th>
          <th @click="sortBy('gestionnaire')">Gestionnaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parking in paginatedData" :key="parking.id">
          <td v-html="highlight(parking.id)"></td>
          <td v-html="highlight(parking.X)"></td>
          <td v-html="highlight(parking.Y)"></td>
          <td v-html="highlight(parking.code_com)"></td>
          <td v-html="highlight(parking.capacite)"></td>
          <td v-html="highlight(parking.acces)"></td>
          <td v-html="highlight(parking.lumiere ? 'Oui' : 'Non')"></td>
          <td v-html="highlight(parking.surveillance ? 'Oui' : 'Non')"></td>
          <td v-html="highlight(parking.gestionnaire)"></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
      <input type="number" v-model.number="itemsPerPage" min="1" @change="updateItemsPerPage" class="items-per-page"/>
    </div>
    <footer class="footer">
      <p>&copy; 2024 Géolocalisation App. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkings: [],
      currentPage: 1,
      itemsPerPage: 20,
      searchQuery: '',
      sortKey: '',
      sortOrder: 1, // 1 for ascending, -1 for descending
      pageInput: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    filteredData() {
      const query = this.searchQuery.toLowerCase();
      return this.parkings.filter(parking => {
        return (
          parking.id.toString().includes(query) ||
          parking.X.toString().toLowerCase().includes(query) ||
          parking.Y.toString().toLowerCase().includes(query) ||
          parking.code_com.toLowerCase().includes(query) ||
          parking.capacite.toString().includes(query) ||
          parking.acces.toLowerCase().includes(query) ||
          (parking.lumiere ? 'oui' : 'non').includes(query) ||
          (parking.surveillance ? 'oui' : 'non').includes(query) ||
          parking.gestionnaire.toLowerCase().includes(query)
        );
      }).sort((a, b) => {
        if (this.sortKey) {
          const sortA = a[this.sortKey].toString().toLowerCase();
          const sortB = b[this.sortKey].toString().toLowerCase();
          if (sortA < sortB) return -1 * this.sortOrder;
          if (sortA > sortB) return 1 * this.sortOrder;
          return 0;
        }
        return 0;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:1337/api/bicycle-parkings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        this.parkings = data.data.map(item => ({
          id: item.id,
          X: item.attributes.X,
          Y: item.attributes.Y,
          code_com: item.attributes.code_com,
          capacite: item.attributes.capacite,
          acces: item.attributes.acces,
          lumiere: item.attributes.lumiere,
          surveillance: item.attributes.surveillance,
          gestionnaire: item.attributes.gestionnaire,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.pageInput = this.currentPage;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.pageInput = this.currentPage;
      }
    },
    goToPage() {
      if (this.pageInput >= 1 && this.pageInput <= this.totalPages) {
        this.currentPage = this.pageInput;
      } else {
        this.pageInput = this.currentPage;
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = -this.sortOrder;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    highlight(text) {
      if (!this.searchQuery) {
        return text;
      }
      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return text.toString().replace(regex, '<span class="highlight">$1</span>');
    },
  },
};
</script>

<style scoped>
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
  text-align: center;
}

.search-bar {
  display: block;
  margin: 0 auto 20px;
  padding: 10px;
  width: 50%;
  border: 2px solid rgba(90, 109, 124, 0.8); /* Marron foncé */
  border-radius: 5px;
  font-size: 16px;
}

.data-table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.data-table th {
  cursor: pointer;
  background-color: rgba(90, 109, 124, 0.8); /* Marron automnal */
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: rgba(90, 109, 124, 0.8); /* Marron automnal */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: rgba(90, 109, 124, 0.8); /* Marron foncé */
}

.pagination span {
  margin: 0 10px;
}

.pagination .items-per-page {
  width: 60px;
  padding: 5px;
  text-align: center;
}

.highlight {
  background-color: yellow;
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
