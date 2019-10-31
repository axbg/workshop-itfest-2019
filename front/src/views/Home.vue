<template>
  <div class="home-container">
    <p class="command">{{"\"" + command + "\""}}</p>
    <hr class="horizontal-line" />
    <p class="answer">answer</p>
    <div class="switch" @click="listen">
      <md-icon class="md-size-3x" :class="{active: isActive}">mic</md-icon>
      <md-icon class="md-size-3x" :class="{active: isActive}">mic</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    isActive: false,
    command: "turn on the lights",
    answer: "cool. done."
  }),
  methods: {
    listen: function() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style>
.home-container {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  margin: 0 auto;
  display: inline-block;
}
.command {
  margin-top: 20vh;
  font-size: 2em;
}
.answer {
  margin-top: 5vh;
  font-size: 1.6em;
}
.horizontal-line {
  width: 50%;
}
.switch {
  margin-top: 50vh;
}
.active {
  color: red !important;
}
</style>