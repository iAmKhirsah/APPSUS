export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
      <h1>{{note.info.title}}</h1>
      <p v-for="todo in note.info.todos">{{todo.txt}}{{todo.doneAt}}</p>
    </div>
    <div class="in-note-control">
    <div class="color-container">
<input type="color"  v-model="color" @input="changeBackgroundColor"/>
<i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
</div>
      <button @click="remove(note.id)" class="remove-note"></button>
</div>
    </div>`,
  data() {
    return {
      color: '#808080',
    };
  },
  methods: {
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
};
