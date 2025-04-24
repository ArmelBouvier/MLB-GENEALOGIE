<template>
    <section class="homepage">
      <div class="intro">
        <h1>À la recherche de vos racines ?</h1>
        <p>
          Je suis <strong>Marie-Louise Bouvier</strong>, généalogiste passionnée depuis plus de 25 ans.
          Je vous aide à remonter le fil de votre histoire familiale, à travers les archives,
          les souvenirs et les générations.
        </p>
        <router-link to="/contact">
            <button>Me contacter</button>
        </router-link>
      </div>
  
      <div class="services">
        <h2>Mes services</h2>
        <ul>
          <li>Recherches généalogiques sur mesure</li>
          <li>Arbres généalogiques illustrés</li>
          <li>Transcription d'actes anciens</li>
          <li>Enquêtes sur l’histoire d’un lieu ou d’une famille</li>
        </ul>
      </div>
    </section>
    <div v-if="canEdit">
      <h2>Éditeur de contenu</h2>
      <Editor />
  </div>
  </template>
  
  <script setup>
    import Editor from '@/components/Editor.vue'
    import { jwtDecode } from 'jwt-decode'
    import { watch, ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    // État local
    const role = ref(null)
    const route = useRoute()

    function decodeToken() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          role.value = decoded.role
        } catch {
          role.value = null
        }
      } else {
        role.value = null
      }
    }

    // Récupération du token et décodage
    onMounted(decodeToken)

    watch(route, () => {
      decodeToken()
    })

    // Autorisation d’édition ?
    const canEdit = computed(() => role.value === 'admin' || role.value === 'editor')
</script>


  
  <style scoped>
  .homepage {
    padding: 2rem;
    font-family: "Georgia", serif;
    background: #f8f5f0;
    color: #333;
  }
  
  .intro {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .intro h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2e5e4e;
  }
  
  .intro p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: #2e5e4e;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #3c7d68;
  }
  
  .services {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .services h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .services ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  router-link button {
  all: unset;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  background: #2e5e4e;
  color: white;
  border-radius: 6px;
}

  </style>  