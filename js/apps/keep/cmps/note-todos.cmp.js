export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
    <!-- <router-link :to="'/keep/'+note.id"> -->
      <h1>{{note.info.title}}</h1>
      <p v-for="todo in note.info.todos">{{todo.txt}}{{todo.doneAt}}</p>
    <!-- </router-link> -->
    </div>
      <button @click="remove(note.id)" class="remove-note"></button>
            </div>`,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
  },
};
