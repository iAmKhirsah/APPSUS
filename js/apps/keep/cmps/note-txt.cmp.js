import { eventBus } from "../../../../services/event-bus-service.js";

export default {
    props: ['note', 'hover'],
    template: `<div>
    <div @click="update(note.id)">
      <h1>{{note.info.title}}</h1>
      <p>{{note.info.txt}}</p>
    </div>
    <div :class="['in-note-control', isHover]">
      <button @click="setPinned" class="pin-note" :class="checkClicked"></button>
      <label for="note-color-input" class="note-color-icon"></label>
      <input id="note-color-input" class="hide" type="color" v-model="color" @input="changeBackgroundColor"/>
          <!-- <div div div class="color-container">
              <i class="palette fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
          </div> -->
      <router-link to="/mail/" @click.native="sendToMail">SendMail</router-link>
      <button @click="duplicateNote" class="duplicate"></button>
      <button @click="remove(note.id)" class="remove-note"></button>
    </div>
  </div>`,
    data() {
        return {
            toHover: null,
            color: '#ffffff',
        };
    },
    methods: {
        sendToMail() {
            this.$emit('sendMail', this.note);
        },
        setHover(val) {
            this.toHover = val;
        },
        duplicateNote() {
            this.$emit('duplicate', this.note);
        },
        setPinned() {
            this.note.isPinned = !this.note.isPinned;
            this.$emit('pinned', this.note);
        },
        remove(noteId) {
            this.$emit('remove', noteId);
        },
        update(noteId) {
            this.$emit('update', noteId);
        },
        changeBackgroundColor() {
            this.$emit('newBgc', this.color, this.note.id);
        },
    },
    computed: {
        checkClicked() {
            return this.note.isPinned ? 'clicked' : '';
        },
        isHover() {
            return this.toHover ? '' : 'opacity-hide';
        },
    },
    watch: {
        hover: function(newVal) {
            this.setHover(newVal);
        },
    },
};