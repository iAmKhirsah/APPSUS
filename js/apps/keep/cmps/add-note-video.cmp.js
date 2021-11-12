export default {
  props: ['noteToEdit', 'processedUrl'],
  template: `
         <form @submit.prevent="sendNote"> 
         <iframe 
            :src="processedUrl">
          </iframe>
          <input type="text" v-model="note.info.title" placeholder="Title">
          <input type="text" v-model="note.info.url" @input="sendToProcess" placeholder="Youtube Url...">
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <button v-show="!noteToEdit">Save</button>
         </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-vid',
        isPinned: false,
        info: {
          url: null,
          title: null,
          txt: null,
        },
        style: {
          backgroundColor: '#808080',
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
    sendToProcess() {
      let url = this.note.info.url;
      this.$emit('urlProcess', url);
    },
    setUrl(url) {
      this.note.info.url = url;
    },
    sendNote() {
      this.$emit('noteVid', this.note);
    },
  },
  watch: {
    processedUrl: function (newVal, oldVal) {
      this.setUrl(newVal);
    },
  },
};
