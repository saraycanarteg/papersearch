<template>
  <div class="search-box">
    <input
      v-model="localQuery"
      @keyup.enter="handleSearch"
      type="text"
      placeholder="Search by title (e.g., health insurance, cancer, COVID-19...)"
      class="search-input"
    />
    <button @click="handleSearch" class="search-button" :disabled="loading">
      {{ loading ? 'Searching...' : 'Search' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'search'],
  computed: {
    localQuery: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search');
    }
  }
};
</script>