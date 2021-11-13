export default {
  props: ['noteToEdit', 'processedImg', 'toSave'],
  template: `
         <form @submit.prevent="sendNote"> 
          <img v-if="note.info.url" :src="note.info.url"/>
          <input v-model="note.info.title" type="text" placeholder="Title">
          <textarea v-model="note.info.txt" placeholder="Take img..." rows="4" cols="50"></textarea>
          <!-- <label for="img-input" class="img-input-label"></label>
            <input id="img-input" @change="uploadImage" type="file" accept="image/*" />
          <button @click.prevent="clearImg">Clear</button> -->
          <!-- <button v-show="!noteToEdit">Save</button> -->
         </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-img',
        isPinned: false,
        info: {
          url: null,
          txt: null,
          title: null,
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
    clearImg() {
      this.note.info.url = null;
    },
    // uploadImage(e) {
    //   this.$emit('imgToProcess', e);
    //   const image = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onload = (e) => {
    //     this.note.info.url = e.target.result;
    //   };
    // },
    sendNote() {
      console.log(this.note);
      this.$emit('noteImg', this.note);
      this.$nextTick(() => {
        this.note.info.title = null;
        this.note.info.txt = null;
        this.note.info.url = null;
      });
    },
  },
  watch: {
    toSave(newVal, oldVal) {
      if (newVal === this.note.type) this.sendNote();
    },
    processedImg(newVal, oldVal) {
      this.note.info.url = newVal;
    },
  },
};
