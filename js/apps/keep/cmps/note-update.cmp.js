import { asyncStorageService } from '../../../../services/async-storage-service.js';
import addRegularNote from './add-regular-note.cmp.js';
import addNoteImg from './add-note-img.cmp.js';
import addNoteTodos from './add-note-todos.cmp.js';
import addNoteVideo from './add-note-video.cmp.js';
import { noteService } from '../services/note.service.js';
export default {
  components: {
    addRegularNote,
    addNoteImg,
    addNoteTodos,
    addNoteVideo,
  },
  props: ['noteId'],
  template: `
    <section class="note-edit-container" :style="'background-color: ' + noteToEdit?.style.backgroundColor">
                  <button class="close-update-screen" @click="closeEditScreen">X</button>
                  <add-regular-note @noteTxt="saveNote"  v-if="noteToEdit?.type === 'note-txt'" :noteToEdit="noteToEdit"/>
                  <add-note-img @noteImg="saveNote"  v-if="noteToEdit?.type === 'note-img'" :noteToEdit="noteToEdit"/>
                  <add-note-todos @noteTodo="saveNote"  v-if="noteToEdit?.type === 'note-todos'" :noteToEdit="noteToEdit"/>
                  <add-note-video @noteVid="saveNote"  v-if="noteToEdit?.type === 'note-vid'" :noteToEdit="noteToEdit"/>
                  <div>
                  <div class="color-container">
                  <i class="fas fa-palette" :style="'background-color: ' + noteToEdit?.style.backgroundColor"></i>
                  <input type="color" v-model="noteToEdit?.style.backgroundColor"/>
                  </div>
                  <button @click="saveNote">Update!</button>
                  </div>
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
    closeEditScreen() {
      this.$emit('closeUpdate');
    },
    saveNote() {
      let note = this.noteToEdit;
      if (!note.info.title && !note.info.txt) return;
      noteService.toPut('notes', note).then(() => {
        this.$emit('UpdatedNote');
        this.noteToEdit = null;
      });
    },
  },
};
