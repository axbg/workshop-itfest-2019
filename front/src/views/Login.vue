<template>
  <div class="login-container">
    <md-card class="md-elevation-12">
      <md-card-content class="credentials-container">
        <md-field md-clearable>
          <label>Email</label>
          <md-input v-model="email" ref="email"></md-input>
        </md-field>
        <md-field :md-toggle-password="true">
          <label>Password</label>
          <md-input v-model="password" type="password" ref="password"></md-input>
        </md-field>
        <md-button class="md-raised md-accent" @click="login">Let's go</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "login",
  props: ["baseUrl"],
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    login: async function() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        !this.email.includes(".")
      ) {
        this.email = "";
        this.$refs.email.$el.focus();
        this.$toasted.show("Email is not valid");
        return;
      }

      if (this.password === "") {
        this.password = "";
        this.$refs.password.$el.focus();
        this.$toasted.show("Password cannot be empty");
        return;
      }

      try {
        const response = await this.$axios.post(this.baseUrl + "/login", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push({ name: "home" });
      } catch (ex) {
        this.$toasted.show("Incorrect credentials");
      }
    }
  }
};
</script>

<style>
.login-container {
  margin: 0 auto;
  width: 30%;
  margin-top: 20vh;
  display: inline-block;
}
.credentials-container {
  margin: 0 auto;
  width: 80%;
}

@media only screen and (max-width: 1200px) {
  .login-container {
    width: 90%;
  }
}
</style>