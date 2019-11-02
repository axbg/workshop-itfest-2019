<template>
  <div class="home-container">
    <div @click="logout">
      <md-icon class="md-size-2x logout-icon">clear</md-icon>
    </div>
    <p class="command">{{"\"" + command + "\""}}</p>
    <hr class="horizontal-line" />
    <md-progress-spinner v-if="answer === null" md-mode="indeterminate" :md-diameter="30" ></md-progress-spinner>
    <p class="answer" v-else>{{answer}}</p>
    <div class="switch" @click="listen">
      <md-icon class="md-size-3x custom-icon" :class="{active: isActive}">mic</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    recognition: null,
    isActive: false,
    command: "Waiting for command...",
    answer: ""
  }),
  methods: {
    initSpeech: function() {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = "en-US";
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = event => {
        const last = event.results.length - 1;
        const result = event.results[last][0].transcript;
        this.command = result.trim();
        this.answer = null;
        setTimeout(() => {
          this.answer = "";
          this.answer = "yes";
        }, 1000);
      };

      this.recognition.onnomatch = event => {
        console.log("Couldn't recognize what you said");
      };

      this.recognition.onerror = event => {
        this.$toasted.show("Microphone usage not allowed");
      };
    },
    listen: function() {
      if (this.isActive) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }

      this.isActive = !this.isActive;
    },
    logout: function() {
      localStorage.removeItem("token");
      location.reload();
    }
  },
  mounted: function() {
    this.initSpeech();
  }
};
</script>

<style>
.home-container {
  display: inline-block;
  width: 100%;
}
.logout-icon {
  float: right;
  cursor: pointer;
  display: block !important;
}
.command {
  margin-top: 20vh;
  font-size: 1.6em;
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
  cursor: pointer;
}
.active {
  color: red !important;
}
</style>