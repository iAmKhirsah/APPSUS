export default {
  props: ['note'],
  template: `<div>
        <h1>{{note.info.title}}</h1>
     <p>{{note.info.txt}}</p>
    </div>`,
};
