<template>
  <div>
    <h1>Données</h1>
    <div id="header">
    <router-link class="btn" to="/">Accueil</router-link>
    <router-link class="btn" to="/geolocalisation">Géolocalisation</router-link>
    <router-link class="btn" to="/cartographie">Cartographie</router-link>
    <router-link class="btn" to="/donnees">Données</router-link>
    </div>

    <!-- Barre de recherche -->
    <input v-model="searchQuery" placeholder="Rechercher..." />

    <table>
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
      <input type="number" v-model.number="pageInput" @keyup.enter="goToPage" min="1" :max="totalPages" />
    </div>
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

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
  cursor: pointer;
}

.highlight {
  background-color: yellow;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}

.pagination input {
  width: 50px;
  text-align: center;
}
</style>
