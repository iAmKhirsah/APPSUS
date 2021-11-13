import { noteService } from './services/note.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
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
      <notes-list :notes="notesToShow" @remove="removeNote" @sendMail="sendMail" @update="updateNote" @newBgc="newBgc" @toSort="toSort" @duplicate="duplicate"/>
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
    sendMail(note) {
      let id = note.id;
      eventBus.$emit('noteToMail', note.info);
      this.$nextTick(() => {
        // this.$router.push('/mail/noteToMail');
        this.$router.push({ path: 'mail/', query: { id: id } });
      });
    },
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
    newBgc(color, note) {
      // console.log('hello');
      // noteService.toGet('notes', id).then((note) => {
      // console.log(note);
      console.log(note);
      note.style.backgroundColor = color;
      // });
      // noteService.applyColor('notes', id, color).then(() => {
      //   console.log('hello');
      // this.loadNotes();
      // });
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
