import { ref, computed } from 'vue'

const cart = ref([])

const loadCart = () => {
  const savedCart = JSON.parse(localStorage.getItem('restaurantCart') || '[]')
  cart.value = savedCart
}

const saveCart = () => {
  localStorage.setItem('restaurantCart', JSON.stringify(cart.value))
}

export function useCart() {
  const addToCart = (dish) => {
    const existingItem = cart.value.find(item => item.id === dish.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...dish, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (dishId) => {
    cart.value = cart.value.filter(item => item.id !== dishId)
    saveCart()
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const cartItemsCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  if (cart.value.length === 0) {
    loadCart()
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemsCount
  }
}