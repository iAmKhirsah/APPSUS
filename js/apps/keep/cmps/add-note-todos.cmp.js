export default {
  props: ['noteToEdit'],
  template: `
           <form @submit.prevent="sendNote"> 
            <input v-model="note.info.title" type="text" placeholder="Title">
            <ul v-for="answer in answers" >
              <li>{{answer.txt}}</li>
            </ul>
            <input class="edit-text-todo" v-if="edit" v-for="todo in note.info.todos" v-model="todo.txt" v-on:keyup.enter.prevent="newTodo()"/>
            <!-- <button @click="addTodo">Add todo</button> -->
            <textarea class="edit-text-todo" v-if="!edit" v-model="note.info.todos.txt" rows="4" cols="50" v-on:keyup.enter.prevent="newTodo()"></textarea>
            <button v-show="!noteToEdit">Save</button>
           </form>`,
  data() {
    return {
      edit: false,
      note: {
        id: null,
        type: 'note-todos',
        isPinned: false,
        info: {
          title: null,
          todos: [{ txt: null, doneAt: null }],
        },
        style: {
          backgroundColor: '#808080',
        },
      },
      answers: [],
    };
  },
  created() {
    if (this.noteToEdit) {
      this.edit = true;
      console.log(this.noteToEdit);
      this.note = this.noteToEdit;
    }
  },

  methods: {
    newTodo() {
      let txt = this.note.info.todos.txt;
      let doneAt = this.note.info.todos.doneAt;
      this.answers.push({ txt, doneAt });
      // txt = null;
      if (!this.edit) this.note.info.todos = [{ txt: null, doneAt: null }];
    },
    sendNote() {
      if (this.edit) {
        this.$emit('noteTodo', this.note);
      } else {
        this.note.info.todos = this.answers;
        this.$emit('noteTodo', this.note);
      }
    },
  },
};
