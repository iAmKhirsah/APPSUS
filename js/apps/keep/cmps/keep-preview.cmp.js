import { noteService } from '../services/note.service.js';
import dynamicKeep from './dynamic-keep.cmp.js';
export default {
  props: ['notes'],
  components: {
    dynamicKeep,
  },
  template: `
    <section>
        <!-- <h1>Hello</h1> -->
        <div v-for="note in notes" :key="note.id">
        <dynamic-keep :note="note"/>
        </div>
    </section>`,
  data() {
    return {};
  },
};
