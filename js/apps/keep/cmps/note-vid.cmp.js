export default {
  props: ['note'],
  template: `<div>
          <h1>{{note.info.title}}</h1>
            <iframe width="200" height="200"
            :src="note.info.url">
            </iframe>
      </div>`,
};
