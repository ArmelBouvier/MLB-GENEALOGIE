<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/dashboard" v-if="isAuthenticated">Mon espace</router-link>
      <router-link to="/login" v-if="!isAuthenticated">Se connecter</router-link>
      <router-link to="/signup" v-if="!isAuthenticated">Créer un compte</router-link>
      <button v-if="isAuthenticated" @click="logout">Se déconnecter</button>
    </nav>
  </template>

    <script>
    export default {
    name: "App",
    data() {
        return {
        isAuthenticated: false
        };
    },
    created() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
          const token = localStorage.getItem("token");
          this.isAuthenticated = !!token;
        },
        logout() {
          localStorage.removeItem("token");
          this.isAuthenticated = false;
          this.$router.push("/");
        }
    },
    watch: {
        $route() {
        this.checkAuth();
        }
    }
    };
    </script>
  
  <style scoped>
  .navbar {
    background: #2e5e4e;
    padding: 1rem;
  }
  .navbar a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  .navbar a.router-link-exact-active {
    text-decoration: underline;
  }
  </style>  