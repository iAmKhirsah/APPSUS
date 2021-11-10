export default {
  props: ['note'],
  template: `<div>
        <h1>{{note.info.title}}</h1>
        <img :src="note.info.url" width="150px" height="150px"/>
      </div>`,
    created(){
      console.log(this.note);
    }
};
