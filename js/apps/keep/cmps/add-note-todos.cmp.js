export default {
  props: ['noteToEdit', 'toSave'],
  template: `
           <form @submit.prevent="sendNote"> 
            <input v-model="note.info.title" type="text" placeholder="Title">
            <!-- <ul v-for="answer in answers" >
              <li checkbox="unchecked">{{answer.txt}}</li>
            </ul> -->
            <div v-for="(answer, idx) in answers" class="todo-div">
              <input type="checkbox" :id="answer + idx">
              <label :for="answer + idx">{{answer.txt}}</label>
            </div>
            <div v-if="edit" v-for="(todo, idx) in note.info.todos">
              <input type="checkbox" :id="todo + idx">
              <input type="text" v-model="todo.txt">
            </div>
            <!-- <input class="edit-text-todo" v-if="edit" v-for="todo in note.info.todos" v-model="todo.txt" v-on:keyup.enter.prevent="newTodo()"/> -->
            <!-- <button @click="addTodo">Add todo</button> -->
            <textarea class="edit-text-todo" v-if="!edit" v-model="note.info.todos.txt" rows="4" cols="50" v-on:keyup.enter.prevent="newTodo()" placeholder="List..."></textarea>
            <!-- <button v-show="!noteToEdit" class="saveButton">Save</button> -->
           </form>`,
  data() {
    return {
      edit: false,
      check: null,
      note: {
        id: null,
        type: 'note-todos',
        isPinned: false,
        info: {
          title: null,
          todos: [{ txt: null, doneAt: null }],
        },
        style: {
          backgroundColor: '#ffffff',
        },
      },
      answers: [],
    };
  },
  created() {
    if (this.noteToEdit) {
      console.log('hello');
      this.edit = true;
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
        this.$nextTick(() => {
          this.note.info.title = null;
          this.answers = [];
        });
      } else {
        this.note.info.todos = this.answers;
        this.$emit('noteTodo', this.note);
        this.$nextTick(() => {
          this.note.info.title = null;
          this.answers = [];
        });
      }
    },
  },
  watch: {
    toSave(newVal, oldVal) {
      if (newVal === this.note.type) this.sendNote();
    },
  },
};
