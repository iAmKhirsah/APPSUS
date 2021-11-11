import noteTxt from './note-txt.cmp.js';
import noteImg from './notes-img.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteVid from './note-vid.cmp.js';

export default {
  props: ['note'],
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVid,
  },
  template: `
    <div>
        <component :note="note" :is="noteType" class="note" @remove="remove" @update="update">{{note}}</component>
    </div>`,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
  },
  computed: {
    noteType() {
      if (this.note.type === 'note-txt') return noteTxt;
      if (this.note.type === 'note-img') return noteImg;
      if (this.note.type === 'note-todos') return noteTodos;
      if (this.note.type === 'note-vid') return noteVid;
    },
  },
};
