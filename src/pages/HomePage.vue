<template>
  <div class="container">
    <div class="hero">
      <h1>Добро пожаловать в "Пиццерию У АШОТА"</h1>
      <p>
        АШОТИК готовит для вас самые вкусные блюда с любовью и заботой. 
        Наша пицца приготовлена из не очень свежих ингредиентов, 
        а десерты вообще беда.
      </p>
      <router-link to="/menu" class="btn">Перейти в меню</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  color: white;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .container {
    padding: 1rem;
  }
}
</style>