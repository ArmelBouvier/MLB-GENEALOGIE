<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// Crée une ref pour rendre l’éditeur réactif
const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: '<p>Bienvenue dans l’éditeur ✍️</p>',
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <div class="editor" v-if="editor">
    <EditorContent :editor="editor" />
  </div>
  <p v-else>Chargement de l'éditeur...</p>
</template>

<style scoped>
.editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  min-height: 200px;
  background-color: #fff;
}
</style>
