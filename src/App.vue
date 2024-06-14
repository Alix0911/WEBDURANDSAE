<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333333; /* Gris foncé */
}

h1 {
  text-align: center;
  margin-top: 20px;
  color: #333333; /* Gris foncé */
}

.btn {
  display: inline-block;
  margin: 10px 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

div {
  text-align: center;
  margin: 0 auto;
}
</style>
