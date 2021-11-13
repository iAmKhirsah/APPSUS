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
    <div class="flex-height-fit">
      <component :note="note" :is="noteType" :hover="hover" class="note" @applyColor="applyColor" @remove="remove" @update="update" @pinned="pinned" @sendMail="sendMail" @duplicate="duplicate" :style="'background-color: ' + note.style.backgroundColor" @mouseover.native="hover = true" @mouseleave.native="hover = false">{{note}}</component>
    </div>`,
  data() {
    return {
      hover: null,
    };
  },
  methods: {
    sendMail(note){
      this.$emit('sendMail', note)
    },
    duplicate(note) {
      this.$emit('duplicate', note);
    },
    pinned(note) {
      this.$emit('pinned', note);
    },
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
    applyColor(note){
      this.$emit('applyColor', note)
    }
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
