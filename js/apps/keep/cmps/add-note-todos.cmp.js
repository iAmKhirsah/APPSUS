export default {
  template: `
           <form @submit.prevent="sendNote" class="add-note-form"> 
            <input class="note-text-input" v-model="note.info.label" type="text" placeholder="Title">
            <!-- <input v-model="note.info.todos.txt" type="text" placeholder="Take note..."> -->
            <textarea v-model="note.info.todos.txt" rows="4" cols="50" v-on:keyup.enter.prevent="newTodo()"></textarea>
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
      answers: [],
    };
  },
  methods: {
    newTodo() {
      let txt = this.note.info.todos.txt;
      let doneAt = this.note.info.todos.doneAt;
      this.answers.push({ txt, doneAt });
      console.log(this.answers);
      this.note.info.todos = [{ txt: null, doneAt: null }];
    },
    sendNote() {
      console.log('i didnt mean to get here');
      this.note.info.todos = this.answers;
      this.$emit('noteTodo', this.note);
    },
  },
};
