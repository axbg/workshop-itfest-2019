<template>
  <div class="home-container">
    <p class="command">{{"\"" + command + "\""}}</p>
    <hr class="horizontal-line" />
    <p class="answer">{{answer}}</p>
    <div class="switch" @click="listen">
      <md-icon class="md-size-3x custom-icon" :class="{active: isActive}">mic</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    isActive: false,
    command: "Waiting for command...",
    answer: ""
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
  display: inline-block;
}
.command {
  margin-top: 20vh;
  font-size: 1.8em;
  word-break: break-all;
}
.horizontal-line {
  width: 50%;
}
.answer {
  font-size: 1.6em;
}
.switch {
  position: fixed;
  width: 100%;
  top: 85%;
  left: 0;
}
.custom-icon {
  border-radius: 50%;
  border: 1px solid black;
}
.active {
  color: red !important;
}
</style>