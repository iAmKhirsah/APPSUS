import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../../services/event-bus-service.js';
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
            <div class="main-note-subcontainer">
              <form class="main-note-form" :class="border" @focus="hideControls" :style="'background-color: ' + note.style.backgroundColor">
                  <add-regular-note @noteTxt="saveNote" @emailNote="emailNote" v-show="note.type === 'note-txt'" :focusOnTxt="focusOnTxt" :toSave="toSave"/>
                  <add-note-img :processedImg="processedImg" @noteImg="saveNote" v-show="note.type === 'note-img'" :toSave="toSave"/>
                  <add-note-todos @noteTodo="saveNote" v-show="note.type === 'note-todos'" :toSave="toSave"/>
                  <add-note-video :processedUrl="processedUrl" @urlProcess="urlProcess" @noteVid="saveNote" v-show="note.type === 'note-vid'" :toSave="toSave"/>
                  <div class="dummy-input-container" v-show="!note.type">
                  <input type="text" placeholder="Take note..." @click="expandSearch" class="dummy-input"/>
                  <div class="todo-icon"  @click="setNoteType('note-todos')"></div>
                  <div class="img-icon" @click="setNoteType('note-img')"></div>
                  </div>
                <div class="controls-container" v-show="controls">
                  <!-- <div class="color-container">
                  <i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
                </div> -->
                  <label for="color-input" class="color-icon"></label>
                  <input id="color-input" class="hide" type="color" v-model="note.style.backgroundColor"/>
                  <button @click="setNoteType('note-txt')" class="txt-icon"></button>
                  <button @click="setNoteType('note-todos')" class="todo-icon"></button>
                  <!-- <button @click="setNoteType('note-img')" class="img-icon"></button> -->
                    <label for="img-input" class="img-icon" @click="setNoteType('note-img')"></label>
                    <input id="img-input" @change="uploadImage" type="file" accept="image/*" />
                  <button @click="setNoteType('note-vid')" class="vid-icon"></button>
                  <button @click="saveToNote" class="close-save-btn">Close</button>
                </div>
              </form>
            </div>
    </section>`,
  data() {
    return {
      toSave: null,
      // fullInput: false,
      controls: false,
      focusOnTxt: false,
      processedImg: null,
      processedUrl: null,
      emailNote: null,
      note: {
        id: null,
        type: null,
        style: {
          backgroundColor: '#ffffff',
        },
      },
    };
  },
  created() {
    eventBus.$on('emailToNote', (email) => {
      console.log(email);
      this.emailNote = email
    });
  },
  methods: {
    /// TODO TRY TO PUT THIS INTO NOTE SERVICEEEEE
    uploadImage(e) {
      this.$emit('imgToProcess', e);
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.processedImg = e.target.result;
      };
    },
    ////////////////////////////////
    saveToNote() {
      this.toSave = this.note.type;
    },
    expandSearch() {
      this.focusOnTxt = true;
      this.controls = true;
      this.note.type = 'note-txt';
    },
    urlProcess(url) {
      this.processedUrl = noteService.processUrl(url);
    },
    // imgToProcess(e) {
    //   // this.processedImg = noteService.processImg(e);
    //   // console.log(this.processedImg);
    // },
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
  computed: {
    border() {
      return this.controls ? 'main-note-form-border' : '';
    },
  },
};
