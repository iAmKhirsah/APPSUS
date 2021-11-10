export default {
  template: `
           <form @submit.prevent="sendNote"> 
            <input v-model="note.info.label" type="text" placeholder="Title">
            <!-- <input v-model="note.info.todos.txt" type="text" placeholder="Take note..."> -->
            <textarea v-model="note.info.todos.txt" rows="4" cols="50" :keyup.enter="newTodo"></textarea>
            <button>Save</button>
           </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-todos',
        info: {
          label: null,
          todos: [{ txt: null, doneAt: null }],
        },
      },
    };
  },
  methods: {
    sendNote() {
      this.$emit('noteTodo', this.note);
    },
  },
};
