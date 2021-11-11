import { asyncStorageService } from '../../../../services/async-storage-service.js';
import addRegularNote from './add-regular-note.cmp.js';
import addNoteImg from './add-note-img.cmp.js';
import addNoteTodos from './add-note-todos.cmp.js';
import addNoteVideo from './add-note-video.cmp.js';
export default {
  components: {
    addRegularNote,
    addNoteImg,
    addNoteTodos,
    addNoteVideo,
  },
  props: ['noteId'],
  template: `
    <section class="note-edit-container">
                  <add-regular-note @noteTxt="saveNote"  v-if="noteToEdit?.type === 'note-txt'" :noteToEdit="noteToEdit"/>
                  <add-note-img @noteImg="saveNote"  v-if="noteToEdit?.type === 'note-img'" :noteToEdit="noteToEdit"/>
                  <add-note-todos @noteTodo="saveNote"  v-if="noteToEdit?.type === 'note-todos'" :noteToEdit="noteToEdit"/>
                  <add-note-video @noteVid="saveNote"  v-if="noteToEdit?.type === 'note-vid'" :noteToEdit="noteToEdit"/>
                  <button @click="saveNote">Update!</button>
    </section>`,
  data() {
    return {
      noteToEdit: null,
    };
  },
  created() {
    var id = this.noteId;
    console.log(id);
    if (id) {
      asyncStorageService
        .get('notes', id)
        .then((note) => (this.noteToEdit = note));
    }
  },
  methods: {
    saveNote() {
      let note = this.noteToEdit;
      if (!note.info.title && !note.info.txt) return;
      asyncStorageService.put('notes', note).then(() => {
        this.$emit('UpdatedNote');
        this.noteToEdit = null;
      });
    },
  },
};
