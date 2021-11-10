import { asyncStorageService } from '../../../../services/async-storage-service.js';
import addRegularNote from './add-regular-note.cmp.js';
import addNoteImg from './add-note-img.cmp.js';
import addNoteTodos from './add-note-todos.cmp.js';
export default {
  components: {
    addRegularNote,
    addNoteImg,
    addNoteTodos,
  },
  template: `
    <section class="note-control-container">
            <div class="text-container">
            <form>
            <add-regular-note @noteTxt="saveNote" v-show="note.type === 'note-txt'"/>
            <add-note-img @noteImg="saveNote" v-show="note.type === 'note-img'"/>
            <add-note-todos @noteTodo="saveNote" v-show="note.type === 'note-todos'"/>
            <div class="input-buttons">
                <button @click="setNoteType('note-todos')">Todo</button>
                <button @click="setNoteType('note-img')">Img</button>
                <button @click="setNoteType('note-vid')">Video</button>
            </div>
            </form>
            </div>
    </section>`,
  data() {
    return {
      fullInput: false,
      note: {
        id: null,
        type: 'note-txt',
      },
    };
  },
  methods: {
    setNoteType(type) {
      this.note.type = type;
    },
    saveNote(note) {
      asyncStorageService.post('notes', note).then(() => {
        this.$emit('AddedNote');
        if ((this.note.type = 'note-txt')) return;
        else {
          this.note.type = null;
        }
      });
    },
    // adjustInfo() {
    //   if (this.note.type === 'note-todos') {
    //     return (this.note.info = {
    //       label: null,
    //       todos: [(txt = null), (doneAt = Date.now())],
    //     });
    //   }
    // },
    // save() {
    //   if (!this.note.type) this.note.type = 'note-txt';
    //   if (!this.note.info.title) this.note.info.title = 'Untitled';
    //   noteService.createNewNote(this.note.id, this.note.type, this.note.info);
    // },
    // save() {
    //   console.log('i hit save');
    //   if (!this.note.type) this.note.type = 'note-txt';
    //   if (!this.note.info.title) this.note.info.title = 'Untitled';
    //   console.log(this.note.type);
    //   asyncStorageService.post('notes', this.note).then(() => {
    //     this.$emit('AddedNote');
    //     this.note.type = null;
    //   });
    // },
  },
};
