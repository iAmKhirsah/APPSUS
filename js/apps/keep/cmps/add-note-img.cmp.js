export default {
  template: `
         <form @submit.prevent="sendNote" class="add-note-form"> 
          <img v-if="note.info.url" :src="note.info.url" width="150px" height="150px"/>
          <input @change="uploadImage" type="file" accept="image/*" />
          <input v-model="note.info.title" type="text" placeholder="Title">
          <!-- <input v-model="note.info.txt" type="text" placeholder="Take note..."> -->
          <textarea v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
          <button>Save</button>
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
      this.$emit('noteImg', this.note);
    },
  },
};
