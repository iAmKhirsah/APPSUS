export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
      <h1>{{note.info.title}}</h1>
      <p v-for="todo in note.info.todos">{{todo.txt}}{{todo.doneAt}}</p>
    </div>
    <div class="in-note-control">
    <input type="color" v-model="color" @input="bgColor"/>
      <button @click="remove(note.id)" class="remove-note"></button>
</div>
            </div>`,
  data() {
    return {
      color: '#e1d5d5',
    };
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
    bgColor() {
      this.$emit('bgColor', this.color);
    },
  },
};
