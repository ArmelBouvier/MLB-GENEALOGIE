<template>
    <div class="login">
      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <label>Email :</label>
        <input type="email" v-model="email" required />
  
        <label>Mot de passe :</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Se connecter</button>
      </form>
  
      <p v-if="message" style="margin-top: 1rem;">{{ message }}</p>
  
      <div class="signup-redirect">
        <p>Pas encore de compte ?</p>
        <button @click="goToSignup">Créer un compte</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        message: ""
      };
    },
    methods: {
      async handleLogin() {
        try {
          const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });
  
          const data = await res.json();
  
          if (!res.ok) {
            throw new Error(data.error || "Erreur de connexion");
          }
  
          localStorage.setItem("token", data.token);
  
          this.message = "Connexion réussie ! 🎉";
          //this.$router.push("/dashboard");
          this.$router.push("/");
        } catch (err) {
          this.message = err.message;
        }
      },
      goToSignup() {
        this.$router.push("/signup");
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    background: #f4f4f4;
    border-radius: 8px;
  }
  label {
    display: block;
    margin-top: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.3rem;
  }
  button {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    background: #2e5e4e;
    color: white;
    border: none;
    border-radius: 6px;
  }
  .signup-redirect {
    margin-top: 1.5rem;
    text-align: center;
  }
  .signup-redirect button {
    margin-top: 0.5rem;
    background: #4b7bec;
  }
  </style>
  