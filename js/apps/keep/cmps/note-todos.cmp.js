export default {
  props: ['note', 'hover'],
  template: `<div>
    <div @click="update(note.id)">
        <div v-for="(todo, idx) in note.info.todos" class="todo-div">
                <input type="checkbox" :id="note.id + idx" @click="doneAt(note.id + idx)">
                <!-- <label :for="idx" :class="{idx:isDone}">{{todo.txt}} {{note.id+idx}}</label> -->
                <label :for="note.id + idx" :class="{'line-through': done}">{{todo.txt}} {{note.id+idx}}</label>
        </div>
    </div>
    <div :class="['in-note-control', isHover]">
    <button @click="setPinned" class="pin-note" :class="checkClicked"></button>
    <!-- <label for="note-color-input" class="note-color-icon"></label>
      <input id="note-color-input" class="hide" type="color" v-model="color" @input="changeBackgroundColor"/> -->
    <div class="color-container">
      <input type="color"  v-model="color" @input="changeBackgroundColor"/>
      <i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
      </div>
      <button class="mail-send-icon" @click="sendToMail"></button>
      <button @click="duplicateNote" class="duplicate"></button>
      <button @click="remove(note.id)" class="remove-note"></button>
</div>
    </div>`,
  data() {
    return {
      done: false,
      toHover: null,
      color: '#ffffff',
    };
  },
  methods: {
    doneAt(id) {
      console.log(this.note);

      console.log(id);
      this.done = !this.done;
    },
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
      this.$emit('newBgc', this.color, this.note);
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
