<template>
  <div id="app">
    <div class="container">
      <header>
        <h2>PLOS Articles Search Engine</h2>
      </header>

      <!-- Search Bar Component -->
      <SearchBar 
        v-model="searchQuery"
        :loading="loading"
        @search="handleSearch"
      />

      <!-- Error message -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Searching for articles...</p>
      </div>

      <!-- Results -->
      <div v-else-if="articles.length > 0" class="results-section">
        <div class="results-header">
          <h2>Results: {{ totalResults }} articles found</h2>
          <p class="results-info">
            Showing {{ startIndex + 1 }} - {{ Math.min(startIndex + itemsPerPage, totalResults) }} of {{ totalResults }}
          </p>
        </div>

        <!-- Articles Table Component -->
        <ArticlesTable :articles="paginatedArticles" />

        <!-- Pagination Component -->
        <Pagination 
          :currentPage="currentPage"
          :totalPages="totalPages"
          :itemsPerPage="itemsPerPage"
          @previous="previousPage"
          @next="nextPage"
          @update:itemsPerPage="updateItemsPerPage"
        />
      </div>

      <!-- No results message -->
      <div v-else-if="searched && !loading" class="no-results">
        <p>No articles found. Try a different search term.</p>
      </div>

      <!-- Initial state -->
      <div v-else class="initial-state">
        <p>Enter a search term to find articles</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import ArticlesTable from './components/ArticlesTable.vue';
import Pagination from './components/Pagination.vue';
import { searchArticles } from './services/plosApi';

export default {
  name: 'App',
  components: {
    SearchBar,
    ArticlesTable,
    Pagination
  },
  data() {
    return {
      searchQuery: '',
      articles: [],
      loading: false,
      error: null,
      searched: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalResults: 0
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    paginatedArticles() {
      const start = this.startIndex;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    }
  },
  methods: {
    async handleSearch() {
      if (!this.searchQuery.trim()) {
        this.error = 'Please enter a search term';
        return;
      }

      this.loading = true;
      this.error = null;
      this.searched = true;
      this.currentPage = 1;

      const result = await searchArticles(this.searchQuery);

      if (result.success) {
        this.articles = result.data;
        this.totalResults = result.total;
        
        if (this.articles.length === 0) {
          this.error = 'No articles found. Try a different search term.';
        }
      } else {
        this.error = result.error;
      }

      this.loading = false;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    updateItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    }
  }
};
</script>