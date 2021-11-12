import keepPreview from './keep-preview.cmp.js';
export default {
  props: ['notes'],
  components: {
    keepPreview,
  },
  template: `
    <section class="note-container">
        <div v-for="note in notes" :key="note.id" class="flex-height-fit">
          <keep-preview :note="note" @remove="remove" @update="update" @newBgc="newBgc" @pinned="sortPinned" @duplicate="duplicate"/>
        </div>
    </section>`,
  methods: {
    duplicate(note) {
      this.$emit('duplicate', note);
    },
    sortPinned(note) {
      // this.$emit('toSort', this.notes);
      this.$emit('toSort', this.notes, note);
    },
    sendToSave() {
      this.$emit('toSave', this.notes);
    },
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
    newBgc(color, id) {
      this.$emit('newBgc', color, id);
    },
  },
};
