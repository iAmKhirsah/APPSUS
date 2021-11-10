import noteTxt from './note-txt.cmp.js';
import noteImg from './notes-img.cmp.js';
import noteTodos from './note-todos.cmp.js';

export default {
  props: ['note'],
  components: {
    noteTxt,
    noteImg,
    noteTodos,
  },
  template: `
    <div>
        <component :note="note" :is="noteType" class="note">{{note}}</component>
    </div>`,
    methods: {
        
    },
  computed: {
    noteType() {
      if (this.note.type === 'note-txt') return noteTxt;
      if (this.note.type === 'note-img') return noteImg;
      if (this.note.type === 'note-todos') return noteTodos;
    },
  }
};
