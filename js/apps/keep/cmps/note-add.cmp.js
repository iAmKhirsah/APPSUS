import { asyncStorageService } from '../../../../services/async-storage-service.js';
export default {
  template: `
    <section>
        <!-- <div class="add-note-container" @click="toggleFullInput" placeholder="Take note..."> -->
            <div class="text-container">
            <form>
            <input v-model="note.info.title" type="text" placeholder="Title">
            <input v-model="note.info.txt" type="text" placeholder="Take note...">
            <div class="input-buttons">
                <button @click.prevent="save">Save</button>
                <button @click="setNoteType('note-todos')">Todo</button>
                <button>Img</button>
                <button>Video</button>
                </div>
            </form>
            </div>
        <!-- </div> -->
    </section>`,
  data() {
    return {
      fullInput: false,
      note: {
        id: null,
        type: null,
        info: {
          txt: null,
          title: null,
        },
      },
    };
  },
  methods: {
    setNoteType(type) {
      this.note.type = type;
    },
    save() {
      console.log('i hit save');
      if (!this.note.type) this.note.type = 'note-txt';
      if (!this.note.info.title) this.note.info.title = 'Untitled';
      console.log(this.note.type);
      asyncStorageService.post('notes', this.note).then(() => {
        this.$emit('AddedNote');
        this.note.type = null;
      });
    },
  },
};
