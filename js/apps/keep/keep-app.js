import { noteService } from './services/note.service.js';
import { asyncStorageService } from '../../../services/async-storage-service.js';
import notesList from './cmps/notes-list.cmp.js';
import noteAdd from './cmps/note-add.cmp.js';
import noteUpdate from './cmps/note-update.cmp.js';
import keepAppHeader from './cmps/keep-app-header.cmp.js';
export default {
  components: {
    notesList,
    noteAdd,
    noteUpdate,
    keepAppHeader,
  },
  template: `
    <section class="keep-app">
      <keep-app-header/>
      <note-add @AddedNote="loadNotes"/>
      <notes-list :notes="notes" @remove="removeNote" @update="updateNote"/>
      <note-update v-show="noteId" v-if="noteId" :noteId="noteId" @UpdatedNote="noteId = null" @closeUpdate="noteId = null"/>
    </section>
    `,
  data() {
    return {
      notes: null,
      noteId: null,
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
        console.log(this.notes);
      });
    },
    updateNote(id) {
      this.noteId = id;
    },
    removeNote(id) {
      asyncStorageService.remove('notes', id).then(() => {
        this.loadNotes();
      });
    },
  },
};
