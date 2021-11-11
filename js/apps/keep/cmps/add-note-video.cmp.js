export default {
  props: ['noteToEdit'],
  template: `
         <form @submit.prevent="sendNote"> 
         <iframe v-if="note.info.url" width="150" height="150"
            :src="note.info.url">
          </iframe>
          <input type="text" v-model="note.info.title" placeholder="Title">
          <input type="text" v-model="note.info.url" @change="processLink" placeholder="Youtube Url...">
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <button v-show="!noteToEdit">Save</button>
         </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-vid',
        info: {
          url: null,
          title: null,
          txt: null,
        },
      },
    };
  },
  created() {
    if (this.noteToEdit) {
      this.note = this.noteToEdit;
    }
  },
  methods: {
    processLink() {
      let url = this.note.info.url;
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      this.note.info.url = `//www.youtube.com/embed/${
        match && match[2].length === 11 ? match[2] : null
      }`;
    },
    sendNote() {
      this.$emit('noteVid', this.note);
    },
  },
};
