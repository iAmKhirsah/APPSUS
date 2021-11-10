export default {
  //   props: ['note.type'],
  template: `
       <form @submit.prevent="sendNote" class="add-note-form"> 
        <input type="text" v-model="note.info.title" placeholder="Title">
        <!-- <input v-model="note.info.txt" type="text" placeholder="Take note..."> -->
        <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
        <button>Save</button>
       </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-txt',
        info: {
          txt: null,
          title: null,
        },
      },
    };
  },
  methods: {
    sendNote() {
      this.$emit('noteTxt', this.note);
    },
  },
};
