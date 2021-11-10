import { noteService } from './services/note.service.js';
import { asyncStorageService } from '../../../services/async-storage-service.js';
import notesList from './cmps/notes-list.cmp.js';
import noteAdd from './cmps/note-add.cmp.js';
export default {
  components: {
    notesList,
    noteAdd,
  },
  template: `
    <section class="keep-app">
      <note-add @AddedNote="loadNotes"/>
      <notes-list :notes="notes" @remove="removeNote"/>
    </section>
    `,
  data() {
    return {
      notes: null,
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
    removeNote(id) {
      asyncStorageService.remove('notes', id).then(() => {
        this.loadNotes();
      });
    },
  },
};
