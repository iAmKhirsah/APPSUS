export default {
    props: ['txt'],
    template: `
    <div>
     <p>{{textForDisplay}} </p>
    <button  class="details-btn" v-if="txt.length > 100" @click="expandText = !expandText">{{textButton}}</button>
    </div>
    `,
    data() {
        return {
            expandText: false,
            textBtn: ''
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            if (this.expandText) {
                return this.txt
            } else {
                if (this.txt.length > 100) return this.txt.slice(0, 100) + '...'
                else return this.txt;
            }
            // return this.expandText && this.txt.length < 100 ? this.txt : this.txt.slice(0, 100)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        // isLongTxt() {
        //     return this.txt.length > 100
        // }
    }

}