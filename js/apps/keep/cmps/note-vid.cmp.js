export default {
  props: ['note'],
  template: `<div>
          <h1>{{note.info.title}}</h1>
            <iframe width="420" height="315"
            :src="note.info.url">
            </iframe>
      </div>`,
};
