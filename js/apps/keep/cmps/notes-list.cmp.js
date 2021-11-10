import keepPreview from './keep-preview.cmp.js';

export default {
  props: ['notes'],
  components: {
    keepPreview,
  },
  template: `
    <section class="notes-container">
        <div v-for="note in notes" :key="note.id">
          <button @click="remove(note.id)">X</button>
          <keep-preview :note="note"/>
        </div>
    </section>`,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
  },
};
