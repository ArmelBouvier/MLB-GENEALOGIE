<template>
    <div class="dashboard">
      <h1>Mon espace</h1>
      <p v-if="userEmail">Bienvenue, {{ userEmail }} 🎉</p>
      <p v-else>Chargement...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Dashboard",
    data() {
      return {
        userEmail: null
      };
    },
    async created() {
      const token = localStorage.getItem("token");
  
      if (!token) {
        this.$router.push("/login");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/protected", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!res.ok) {
          throw new Error("Non autorisé");
        }
  
        const data = await res.json();
        this.userEmail = data.email;
      } catch (err) {
        console.error(err);
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    background: #eef2f5;
    border-radius: 10px;
    text-align: center;
  }
  </style>
  