<template>
  <div class="filters">
    <button 
      v-for="category in categories" 
      :key="category"
      @click="$emit('category-changed', category)"
      :class="['filter-btn', { active: selectedCategory === category }]"
    >
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    }
  },
  emits: ['category-changed']
}
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn.active,
.filter-btn:hover {
  background: white;
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>