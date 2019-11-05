<template>
  <div class="home-container">
    <md-drawer :md-active.sync="drawer" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <h2>Your devices</h2>
      </md-toolbar>
      <md-list>
        <md-list-item v-for="(device, index) in devices" :key="index">
          <p>{{index + 1}}. {{device.alias}}</p>
        </md-list-item>
      </md-list>
    </md-drawer>

    <div v-on:click="openDrawer">
      <md-icon class="md-size-2x drawer-icon">menu</md-icon>
    </div>
    <div @click="logout">
      <md-icon class="md-size-2x logout-icon">clear</md-icon>
    </div>
    <p class="command">{{"\"" + command + "\""}}</p>
    <hr class="horizontal-line" />
    <md-progress-spinner v-if="answer === null" md-mode="indeterminate" :md-diameter="30"></md-progress-spinner>
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
    speaker: null,
    isActive: false,
    command: "Waiting for command...",
    answer: "",
    drawer: false,
    devices: []
  }),
  props: ["baseUrl"],
  methods: {
    getHeaders: function() {
      const token = localStorage.getItem("token");
      return { headers: { authorization: "Bearer " + token } };
    },
    loadDevices: async function() {
      const response = await this.$axios.get(
        this.baseUrl + "/devices",
        this.getHeaders()
      );
      this.devices = response.data.devices;
    },
    openDrawer: function() {
      this.drawer = true;
    },
    logout: function() {
      localStorage.removeItem("token");
      location.reload();
    },
    initListen: async function() {
      this.speaker = window.speechSynthesis;

      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = "en-US";
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = async event => {
        const last = event.results.length - 1;
        const result = event.results[last][0].transcript;
        const isFinal = event.results[last].isFinal;
        this.command = result.trim();

        if (isFinal) {
          this.answer = null;
          try {
            const response = await this.$axios.post(
              this.baseUrl + "/command",
              { command: this.command },
              this.getHeaders()
            );
            this.answer = response.data.message;
          } catch (ex) {
            this.answer = ex.response.data.message;
          } finally {
            this.speak();
          }
        }
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
    speak: function() {
      if (this.speaker.speaking) {
        return;
      }

      this.recognition.stop();

      const utter = new SpeechSynthesisUtterance(this.answer);
      utter.pitch = 1;
      utter.rate = 1;
      utter.onend = event => {
        this.recognition.start();
      };
      utter.onerror = function(event) {
        console.log(event);
      };

      this.speaker.speak(utter);
    }
  },
  mounted: function() {
    this.initListen();
    this.loadDevices();
  }
};
</script>

<style>
.home-container {
  display: inline-block;
  width: 100%;
}
.drawer-icon {
  float: left;
  cursor: pointer;
}
.logout-icon {
  float: right;
  cursor: pointer;
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