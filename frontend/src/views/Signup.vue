<template>
    <div class="signup">
      <h1>Créer un compte</h1>
      <form @submit.prevent="handleSignup">
        <label>Email :</label>
        <input type="email" v-model="email" required />
  
        <label>Mot de passe :</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">S'inscrire</button>
      </form>
  
      <p v-if="message" style="margin-top: 1rem;">{{ message }}</p>
  
      <div class="login-redirect">
        <p>Déjà un compte ?</p>
        <button @click="goToLogin">Se connecter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Signup",
    data() {
      return {
        email: "",
        password: "",
        message: ""
      };
    },
    methods: {
      async handleSignup() {
        try {
          const res = await fetch("http://localhost:3000/signup", {
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
            throw new Error(data.error || "Erreur d'inscription");
          }
  
          this.message = "Compte créé avec succès 🎉";
          this.email = "";
          this.password = "";
  
          // Optionnel : rediriger directement vers login
          this.$router.push("/login");
        } catch (err) {
          this.message = err.message;
        }
      },
      goToLogin() {
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .signup {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    background: #f8f8f8;
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
  .login-redirect {
    margin-top: 1.5rem;
    text-align: center;
  }
  .login-redirect button {
    margin-top: 0.5rem;
    background: #4b7bec;
  }
  </style>
  