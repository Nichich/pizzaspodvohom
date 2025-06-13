<template>
  <div class="container">
    <h1 class="page-title">Ваш заказ</h1>
    
    <div class="cart-container">
      <div v-if="cart.length === 0" class="empty-cart">
        <p>Корзина пуста</p>
        <router-link to="/menu" class="btn">Перейти в меню</router-link>
      </div>
      
      <div v-else>
        <transition-group name="slide" tag="div">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="cart-item"
          >
            <div class="cart-item-info">
              <div class="cart-item-name">{{ item.name }} {{ item.emoji }}</div>
              <div class="cart-item-price">{{ item.price }} ₽ × {{ item.quantity }}</div>
            </div>
            <button 
              @click="removeFromCart(item.id)"
              class="remove-btn"
            >
              Удалить
            </button>
          </div>
        </transition-group>
        
        <div class="cart-total">
          Итого: {{ cartTotal }} ₽
        </div>
        
        <div class="checkout-btn-container">
          <router-link to="/checkout" class="btn">Оформить заказ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'

export default {
  name: 'CartPage',
  setup() {
    const { cart, removeFromCart, cartTotal } = useCart()
    
    return {
      cart,
      removeFromCart,
      cartTotal
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

.cart-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: #f8f9fa;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-weight: bold;
  color: #333;
}

.cart-item-price {
  color: #667eea;
  font-weight: 500;
}

.remove-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.remove-btn:hover {
  background: #ff5252;
  transform: scale(1.05);
}

.cart-total {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.empty-cart {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin: 2rem 0;
}

.checkout-btn-container {
  text-align: center;
}

.btn {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>