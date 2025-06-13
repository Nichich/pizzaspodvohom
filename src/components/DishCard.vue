<template>
  <div class="dish-card">
    <div class="dish-info">
      <h3 class="dish-name">{{ dish.name }}</h3>
      <p class="dish-description">{{ dish.description }}</p>
      <div class="dish-footer">
        <span class="dish-price">{{ dish.price }} ₽</span>
        <button 
          @click="handleAddToCart"
          class="add-to-cart"
          ref="addButton"
        >
          Добавить в заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'

export default {
  name: 'DishCard',
  props: {
    dish: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addToCart } = useCart()
    const addButton = ref(null)

    const handleAddToCart = () => {
      addToCart(props.dish)
      
      if (addButton.value) {
        addButton.value.classList.add('add-animation')
        setTimeout(() => {
          addButton.value.classList.remove('add-animation')
        }, 600)
      }
    }

    return {
      handleAddToCart,
      addButton
    }
  }
}
</script>

<style scoped>
.dish-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.dish-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.dish-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.dish-info {
  padding: 1.5rem;
}

.dish-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.dish-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.add-to-cart {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.add-to-cart:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.add-to-cart.add-animation {
  animation: addToCart 0.6s ease-out;
}

@keyframes addToCart {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); background: #4CAF50; }
  100% { transform: scale(1); }
}
</style>