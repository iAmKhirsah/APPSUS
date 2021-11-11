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
      <keep-app-header @filtered="filtered"/>
      <note-add @AddedNote="loadNotes"/>
      <notes-list :notes="notesToShow" @remove="removeNote" @update="updateNote" @newBgc="newBgc"/>
      <note-update v-show="noteId" v-if="noteId" :noteId="noteId" @UpdatedNote="finalizeUpdate" @closeUpdate="noteId = null"/>
    </section>
    `,
  data() {
    return {
      notes: null,
      noteId: null,
      filterBy: null,
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    filtered(filterBy) {
      this.filterBy = filterBy;
    },
    finalizeUpdate() {
      this.noteId = null;
      this.loadNotes();
    },
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
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
    newBgc(color, id) {
      asyncStorageService.get('notes', id).then((note) => {
        note.style.backgroundColor = color;
        asyncStorageService.put('notes', note).then(() => {
          this.loadNotes();
        });
      });
    },
  },
  computed: {
    notesToShow() {
      console.log(this.filterBy);
      if (!this.filterBy) return this.notes;
      const type = this.filterBy.type;
      const searchStr = this.filterBy.title.toLowerCase();
      if (!this.filterBy.title && this.filterBy.type) {
        const notesToShow = this.notes.filter((note) => {
          return note.type.toLowerCase().includes(type);
        });
        return notesToShow;
      } else if (!this.filterBy.type && this.filterBy.title) {
        const notesToShow = this.notes.filter((note) => {
          return note.info.title.toLowerCase().includes(searchStr);
        });
        return notesToShow;
      } else {
        const notesToShow = this.notes.filter((note) => {
          if (!note.info.title) return;
          return (
            note.info.title.toLowerCase().includes(searchStr) &&
            note.type.toLowerCase().includes(type)
          );
        });
        return notesToShow;
      }
    },
  },
};
