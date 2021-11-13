export default {
  props: ['noteToEdit', 'processedUrl', 'toSave'],
  template: `
         <form @submit.prevent="sendNote" class="video-form"> 
         <iframe 
            :src="processedUrl">
          </iframe>
          <input type="text" v-model="note.info.title" placeholder="Title">
          <input type="text" v-model="note.info.url" @input="sendToProcess" placeholder="Youtube Url...">
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <!-- <button v-show="!noteToEdit">Save</button> -->
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
          backgroundColor: '#ffffff',
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
      this.$nextTick(() => {
        this.note.info.title = null;
        this.note.info.txt = null;
        this.note.info.url = null;
      });
    },
  },
  watch: {
    processedUrl: function (newVal, oldVal) {
      this.setUrl(newVal);
    },
    toSave(newVal, oldVal) {
      if (newVal === this.note.type) this.sendNote();
    },
  },
};
