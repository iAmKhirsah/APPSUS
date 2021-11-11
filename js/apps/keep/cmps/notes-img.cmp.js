export default {
  props: ['note'],
  template: `<div>
    <div @click="update(note.id)">
            <h1>{{note.info.title}}</h1>
            <img :src="note.info.url" width="150px" height="150px" class="note-img"/>
            <p>{{note.info.txt}}</p>
</div>
<div class="in-note-control">
<div class="color-container">
<input type="color" v-model="color" @input="changeBackgroundColor"/>
<i class="fas fa-palette" :style="'background-color: ' + note.style.backgroundColor"></i>
</div>
    <button @click="remove(note.id)" class="remove-note"></button>
</div>
             </div>`,
  data() {
    return {
      color: '#808080',
    };
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    update(noteId) {
      this.$emit('update', noteId);
    },
    changeBackgroundColor() {
      this.$emit('newBgc', this.color, this.note.id);
    },
  },
};
