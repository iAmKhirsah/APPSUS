export default {
  //   props: ['note.type'],
  props: ['noteToEdit', 'focusOnTxt', 'toSave', 'emailNote'],
  template: `
       <form @submit.prevent="sendNote"> 
        <input type="text" v-model="note.info.title" placeholder="Title">
        <!-- <input v-model="note.info.txt" type="text" placeholder="Take note..."> -->
        <textarea ref="txtNote" v-model="note.info.txt" placeholder="Take note..." rows="4" cols="50"></textarea>
        <!-- <button v-show="!noteToEdit">Save</button> -->
       </form>`,
  data() {
    return {
      note: {
        id: null,
        type: 'note-txt',
        isPinned: false,
        info: {
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
    // if(this.emailNote){
    //   console.log(this.emailNote);
    // }
  },
  methods: {
    mailToNote(newVal){
      this.note.info.title = newVal.subject
      this.note.info.txt = newVal.from
      this.note.info.txt += newVal.body
    },
    sendNote() {
      this.$emit('noteTxt', this.note);
      this.$nextTick(() => {
        this.note.info.title = null;
        this.note.info.txt = null;
      });
    },
  },
  watch: {
    focusOnTxt(newVal, oldVal) {
      this.$refs.txtNote.focus();
    },
    toSave(newVal, oldVal) {
      if (newVal === this.note.type) this.sendNote();
    },
    emailNote(newVal, oldVal){
      if(newVal){
        this.mailToNote(newVal)
      };
    }
  },
};
