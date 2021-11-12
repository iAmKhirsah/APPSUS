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
      <notes-list :notes="notesToShow" @remove="removeNote" @update="updateNote" @newBgc="newBgc" @toSort="toSort" @duplicate="duplicate"/>
      <note-update v-show="noteId" v-if="noteId" :noteId="noteId" @UpdatedNote="finalizeUpdate" @closeUpdate="noteId = null"/>
    </section>
    `,
  data() {
    return {
      notes: null,
      noteId: null,
      filterBy: '',
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    duplicate(note) {
      noteService.toPost('notes', note).then(() => {
        this.loadNotes();
      });
    },
    toSort(notes, note) {
      if (note) {
        noteService.toPut('notes', note);
      }
      if (!notes) notes = this.notes;
      return noteService.sortedPins(notes);
    },
    filtered(filterBy) {
      this.filterBy = filterBy;
    },
    finalizeUpdate() {
      this.noteId = null;
      this.loadNotes();
    },
    loadNotes() {
      noteService
        .query()
        .then((notes) => {
          this.notes = notes;
        })
        .then(() => {
          this.toSort();
        });
    },
    updateNote(id) {
      this.noteId = id;
    },
    removeNote(id) {
      noteService.toRemove('notes', id).then(() => {
        this.loadNotes();
      });
    },
    newBgc(color, id) {
      noteService.applyColor('notes', id, color).then(() => {
        this.loadNotes();
      });
    },
  },
  computed: {
    notesToShow() {
      return noteService.filter(
        this.filterBy.type,
        this.filterBy.title,
        this.notes
      );
    },
  },
};
