export default {
    name: 'email-filter',
    props: ['emails'],
    template: `
        <section class="top-bar">
            <div class="logo">
                <img src="./img/logo.png"/>
                <span>Gmail</span>
            </div>

            <input class='search-input' id="search-filter" type="text" v-model="filterBy.search" @input="filter" placeholder="Search mail"/>
                
            
            <label class='read-filter' for="read-filter">
                Read only
                <input id="read-filter" type="checkbox" v-model="filterBy.read" @change="filter"/>
            </label>
            <span class="unread-count">Unread count : {{unreadCount}}</span>

            <section class="sorting">
                <span>Sort By : </span>
                <label for="new">new
                    <input type="radio" name="sorting" value="new" id="new" v-model="sortBy" @change="selected"> 
                </label>
                <label for="old">old
                    <input type="radio" name="sorting" value="old" id="old" v-model="sortBy" @change="selected"> 
                </label>
                    <label for="subject">subject
                    <input type="radio" name="sorting" value="subject" id="subject" v-model="sortBy" @change="selected"> 
                </label>
            </section>
        </section>
    `,
    data() {
        return {
            filterBy: {
                read: false,
                search: '',
            },
            sortBy: null

        }
    },
    computed: {
        unreadCount() {
            return this.emails.filter(email => !email.isRead).length
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        },
        selected() {
            console.log('this.sortBy', this.sortBy);
            this.$emit('sortBy', this.sortBy);
        }
    }
}