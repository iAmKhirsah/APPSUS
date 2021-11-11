export default {
  props: ['noteToEdit'],
  template: `
         <form @submit.prevent="sendNote"> 
          <img v-if="note.info.url" :src="note.info.url" width="150px" height="150px"/>
          <input @change="uploadImage" type="file" accept="image/*" />
          <input v-model="note.info.title" type="text" placeholder="Title">
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <button v-show="!noteToEdit">Save</button>
         </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-img',
        info: {
          url: null,
          txt: null,
          title: null,
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
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.note.info.url = e.target.result;
      };
    },
    sendNote() {
      console.log(this.note);
      this.$emit('noteImg', this.note);
    },
  },
};
