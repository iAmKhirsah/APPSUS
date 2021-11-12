import { asyncStorageService } from '../../../../services/async-storage-service.js';
import { noteService } from '../services/note.service.js';
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
  template: `
    <section class="main-note-controls">
            <div>
              <form class="main-note-form" @focus="hideControls" :style="'background-color: ' + note.style.backgroundColor">
                  <add-regular-note @noteTxt="saveNote" v-show="note.type === 'note-txt'"/>
                  <add-note-img :processedImg="processedImg" @imgToProcess="imgToProcess" @noteImg="saveNote" v-show="note.type === 'note-img'"/>
                  <add-note-todos @noteTodo="saveNote" v-show="note.type === 'note-todos'"/>
                  <add-note-video :processedUrl="processedUrl" @urlProcess="urlProcess" @noteVid="saveNote" v-show="note.type === 'note-vid'"/>
                <div class="controls-container" v-show="controls">
                  <div class="color-container">
                  <i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
                  <input type="color" v-model="note.style.backgroundColor"/>
                  </div>
                  <button @click="setNoteType('note-txt')">Note</button>
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
      controls: true,
      processedImg: null,
      processedUrl: null,
      note: {
        id: null,
        type: 'note-txt',
        style: {
          backgroundColor: '#808080',
        },
      },
    };
  },
  methods: {
    urlProcess(url) {
      this.processedUrl = noteService.processUrl(url);
    },
    imgToProcess(e) {
      // this.processedImg = noteService.processImg(e);
      // console.log(this.processedImg);
    },
    hideControls() {
      this.controls = !this.controls;
    },
    setNoteType(type) {
      this.note.type = type;
    },
    saveNote(note) {
      if (!note.info.title) note.info.title = '';
      note.style.backgroundColor = this.note.style.backgroundColor;
      noteService.toPost('notes', note).then(() => {
        this.$emit('AddedNote');
        if ((this.note.type = 'note-txt')) return;
        else {
          this.note.type = null;
        }
      });
    },
  },
};
