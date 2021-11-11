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
        <component :note="note" :is="noteType" class="note" @remove="remove" @update="update" :style="'background-color: ' + color" @bgColor="bgColor">{{note}}</component>
    </div>`,
  data() {
    return {
      color: '#e1d5d5',
    };
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
    bgColor(color) {
      this.color = color;
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
