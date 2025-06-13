<template>
  <div class="container">
    <h1 class="page-title">Наше меню</h1>
    
    <CategoryFilter 
      :categories="categories"
      :selected-category="selectedCategory"
      @category-changed="selectedCategory = $event"
    />

    <transition-group name="fade" tag="div" class="dishes-grid">
      <DishCard 
        v-for="dish in filteredDishes" 
        :key="dish.id"
        :dish="dish"
      />
    </transition-group>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { dishes } from '../data/dishes'
import DishCard from '../components/DishCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

export default {
  name: 'MenuPage',
  components: {
    DishCard,
    CategoryFilter
  },
  setup() {
    const selectedCategory = ref('Все')

    const categories = computed(() => {
      return ['Все', ...new Set(dishes.map(dish => dish.category))]
    })

    const filteredDishes = computed(() => {
      if (selectedCategory.value === 'Все') {
        return dishes
      }
      return dishes.filter(dish => dish.category === selectedCategory.value)
    })

    return {
      selectedCategory,
      categories,
      filteredDishes
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .dishes-grid {
    grid-template-columns: 1fr;
  }
}
</style>