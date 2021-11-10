export default {
    props: ['txt', 'length'],
    template: `
    <div>
     <p>{{textForDisplay}} </p>
     <button  class="details-btn" v-if="txt.length > length" @click="expandText = !expandText">{{textButton}}</button>
    </div>
    `,
    data() {
        return {
            expandText: false,
            textBtn: ''
        }
    },
    created() {
        console.log(this.txt);
        console.log(this.length);
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
                if (this.txt.length > this.length) return this.txt.slice(0, this.length) + '...'
                else return this.txt
            }
            // return this.expandText && this.txt.this.length < this.length ? this.txt : this.txt.slice(0, this.length)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        // isLongTxt() {
        //     return this.txt.this.length > this.length
        // }
    }

}