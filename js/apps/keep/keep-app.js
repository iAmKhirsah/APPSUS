import { noteService } from './services/note.service.js';
import keepPreview from './cmps/keep-preview.cmp.js';

export default {
  components: {
    keepPreview,
  },
  template: `
    <section class="keep-app">
      <keep-preview :notes="notes" />
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
      console.log(noteService.query());
      noteService.query().then((notes) => {
        this.notes = notes;
        console.log(this.notes);
      });
    },
  },
};
