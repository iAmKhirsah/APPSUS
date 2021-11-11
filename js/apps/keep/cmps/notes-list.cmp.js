import keepPreview from './keep-preview.cmp.js';

export default {
  props: ['notes'],
  components: {
    keepPreview,
  },
  template: `
    <section class="note-container">
        <div v-for="note in notes" :key="note.id">
          <keep-preview :note="note" @remove="remove" @update="update"/>
        </div>
    </section>`,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
  },
};
