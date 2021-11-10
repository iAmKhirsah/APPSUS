export default {
  props: ['notes'],
  template: `
    <div>
    <!-- <p>{{notes}}</p> -->
    <component :is="cmpType">
        I am Dynamic
    </component>
    </div>
    `,
};
