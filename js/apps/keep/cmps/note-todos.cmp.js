export default {
  props: ['note'],
  template: `<div>
        <h1>{{note.info.title}}</h1>
        <p v-for="todo in note.info.todos">{{todo.txt}}{{todo.doneAt}}</p>
        </div>`,
};
