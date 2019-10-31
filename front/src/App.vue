<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
.container::before {
    content: " ";
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6; 
    z-index: -1;
    background-color: whitesmoke;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
