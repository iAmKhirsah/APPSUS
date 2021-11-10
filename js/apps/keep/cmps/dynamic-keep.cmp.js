export default {
  props: ['note'],
  template: `
      <section>
          <!-- <h1>Hello</h1> -->
          <!-- <p>{{note}}</p> -->
          <p v-for="txt in note">{{txt.txt}}</p>
      </section>`,
  data() {
    return {};
  },
  created() {},
};
