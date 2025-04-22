<!-- src/views/Contact.vue -->
<template>
    <section class="contact">
      <h1>Contactez-moi</h1>
      <form @submit.prevent="envoyerFormulaire">
        <label>
          Nom :
          <input type="text" v-model="nom" required />
        </label>
  
        <label>
          Email :
          <input type="email" v-model="email" required />
        </label>
  
        <label>
          Message :
          <textarea v-model="message" rows="5" required></textarea>
        </label>
  
        <button type="submit">Envoyer</button>
      </form>
    </section>
  </template>
  
  <script>
  export default {
    name: "Contact",
    data() {
      return {
        nom: "",
        email: "",
        message: "",
      };
    },
    methods: {
      envoyerFormulaire() {
        console.log("Message envoyé :", {
          nom: this.nom,
          email: this.email,
          message: this.message,
        });
        alert("Merci pour votre message !");
        this.nom = this.email = this.message = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .contact {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f3f3f3;
    border-radius: 8px;
  }
  
  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background: #2e5e4e;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover {
    background: #3a7d68;
  }
  </style>
  