export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
          <!-- <router-link :to="'/keep/'+note.id"> -->
            <h1>{{note.info.title}}</h1>
            <img :src="note.info.url" width="150px" height="150px" class="note-img"/>
            <p>{{note.info.txt}}</p>
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
