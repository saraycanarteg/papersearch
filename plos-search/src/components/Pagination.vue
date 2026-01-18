<template>
  <div class="pagination">
    <button 
      @click="$emit('previous')" 
      :disabled="currentPage === 1"
      class="pagination-button"
    >
      ← Previous
    </button>
    
    <div class="page-info">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <select 
        :value="itemsPerPage" 
        @change="$emit('update:itemsPerPage', Number($event.target.value))" 
        class="items-select"
      >
        <option :value="10">10 per page</option>
        <option :value="25">25 per page</option>
        <option :value="50">50 per page</option>
      </select>
    </div>
    
    <button 
      @click="$emit('next')" 
      :disabled="currentPage === totalPages"
      class="pagination-button"
    >
      Next →
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  emits: ['previous', 'next', 'update:itemsPerPage']
};
</script>