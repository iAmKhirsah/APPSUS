export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
          <!-- <router-link :to="'/keep/'+note.id"> -->
            <h1>{{note.info.title}}</h1>
            <iframe width="200" height="200"
            :src="note.info.url">
          </iframe>
</div>
        <!-- </router-link> -->
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
