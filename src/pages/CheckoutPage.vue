<template>
  <div class="container">
    <h1 class="page-title">Оформление заказа</h1>
    
    <div class="checkout-form">
      <h3 class="form-title">Контактная информация</h3>
      
      <div class="form-group">
        <label for="name">Имя *</label>
        <input 
          id="name"
          v-model="form.name"
          type="text" 
          :class="{ error: errors.name }"
          placeholder="Введите ваше имя"
        >
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <label for="phone">Телефон *</label>
        <input 
          id="phone"
          v-model="form.phone"
          type="tel" 
          :class="{ error: errors.phone }"
          placeholder="+7 (999) 123-45-67"
        >
        <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
      </div>
      
      <div class="form-group">
        <label for="address">Адрес доставки *</label>
        <input 
          id="address"
          v-model="form.address"
          type="text" 
          :class="{ error: errors.address }"
          placeholder="Улица, дом, квартира"
        >
        <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
      </div>
      
      <div class="order-summary">
        <h4>Ваш заказ:</h4>
        <div v-for="item in cart" :key="item.id" class="order-item">
          <span>{{ item.name }} × {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }} ₽</span>
        </div>
        <div class="order-total">
          <strong>Итого: {{ cartTotal }} ₽</strong>
        </div>
      </div>
      
      <button @click="submitOrder" class="btn submit-btn">
        Подтвердить заказ
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

export default {
  name: 'CheckoutPage',
  setup() {
    const { cart, cartTotal, clearCart } = useCart()
    const router = useRouter()
    
    const form = reactive({
      name: '',
      phone: '',
      address: ''
    })
    
    const errors = reactive({
      name: '',
      phone: '',
      address: ''
    })

    const validateForm = () => {
      let isValid = true
      
      errors.name = ''
      errors.phone = ''
      errors.address = ''
      
      if (!form.name.trim()) {
        errors.name = 'Имя обязательно для заполнения'
        isValid = false
      }
      
      if (!form.phone.trim()) {
        errors.phone = 'Телефон обязателен для заполнения'
        isValid = false
      } else if (!/^\+?\d{10,11}$/.test(form.phone.replace(/\D/g, ''))) {
        errors.phone = 'Введите корректный номер телефона'
        isValid = false
      }
      
      if (!form.address.trim()) {
        errors.address = 'Адрес обязателен для заполнения'
        isValid = false
      }
      
      return isValid
    }

    const submitOrder = async () => {
      if (!validateForm()) return
      
      if (cart.value.length === 0) {
        alert('Ваша корзина пуста')
        return
      }
      
      const orderData = {
        ...form,
        items: cart.value,
        total: cartTotal.value
      }
      
      new Promise((resolve) => {
        console.log('Отправка заказа:', orderData)
        setTimeout(() => resolve({ success: true, orderId: '12345' }), 1000)
      })
      .then(response => {
        if (response.success) {
          clearCart()
          alert(`Спасибо за заказ! Номер вашего заказа: #${response.orderId}`)
          router.push({ path: '/' })
        }
      })
      .catch(error => {
        alert(`Ошибка при оформлении заказа: ${error.message}`)
      })
      
      clearCart()
      
    }
    
    return {
      form,
      errors,
      cart,
      cartTotal,
      submitOrder
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.checkout-form {
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
}

.order-summary {
  margin: 30px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.order-summary h4 {
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  text-align: right;
  font-size: 18px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.btn:hover {
  background: #369f6b;
}

.submit-btn {
  width: 100%;
}
</style>