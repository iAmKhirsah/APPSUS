export default {
  props: ['note', 'hover'],
  template: `<div>
    <div @click="update(note.id)">
            <h1>{{note.info.title}}</h1>
            <img :src="note.info.url" width="150px" height="150px" class="note-img"/>
            <p>{{note.info.txt}}</p>
</div>
<div :class="['in-note-control', isHover]">
<button @click="setPinned" class="pin-note" :class="checkClicked" title="Add Pin"></button>
<!-- <label for="note-color-input" class="note-color-icon"></label>
      <input id="note-color-input" class="hide" type="color" v-model="color" @input="changeBackgroundColor"/> -->
<div class="color-container" title="Change Color">
<input type="color" v-model="color" @input="changeBackgroundColor" @blur="applyColor"/>
<i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
</div>
    <button class="mail-send-icon" @click="sendToMail" title="Send to Mail"></button>
    <button @click="duplicateNote" class="duplicate" title="Duplicate"></button>
    <button @click="remove(note.id)" class="remove-note" title="Remove"></button>
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
    applyColor() {
      this.$emit('applyColor', this.note);
    },
    changeBackgroundColor() {
      this.note.style.backgroundColor = this.color;
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
    hover: function (newVal) {
      this.setHover(newVal);
    },
  },
};
