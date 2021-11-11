export default {
  props: ['noteToEdit'],
  template: `
           <form @submit.prevent="sendNote"> 
            <input v-model="note.info.title" type="text" placeholder="Title">
            <textarea v-model="note.info.todos.txt" rows="4" cols="50" v-on:keyup.enter.prevent="newTodo()"></textarea>
            <button v-show="!noteToEdit">Save</button>
           </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-todos',
        info: {
          title: null,
          todos: [{ txt: null, doneAt: null }],
        },
      },
      answers: [],
    };
  },
  created() {
    if (this.noteToEdit) {
      this.note = this.noteToEdit;
    }
  },
  methods: {
    newTodo() {
      let txt = this.note.info.todos.txt;
      let doneAt = this.note.info.todos.doneAt;
      this.answers.push({ txt, doneAt });
      this.note.info.todos = [{ txt: null, doneAt: null }];
    },
    sendNote() {
      this.note.info.todos = this.answers;
      this.$emit('noteTodo', this.note);
    },
  },
};
