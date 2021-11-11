export default {
  props: ['noteToEdit'],
  template: `
         <form @submit.prevent="sendNote"> 
          <img v-if="note.info.url" :src="note.info.url" width="150px" height="150px"/>
          <input v-model="note.info.title" type="text" placeholder="Title">
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <input @change="uploadImage" type="file" accept="image/*" />
          <button @click="clearImg">Cancel</button>
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
    clearImg() {
      this.note.info.url = null;
    },
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
