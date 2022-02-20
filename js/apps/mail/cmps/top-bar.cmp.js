import { eventBus } from "../../../../services/event-bus-service.js";
export default {
    name: 'email-filter',
    props: ['emails', 'burgerMenu'],
    template: `
        <section class="top-bar">
        <!-- <div class="blackBgc" @click="toggleSideBar"></div> -->
            <div v-if="burgerMenu" class="burgerMenu" @click="toggleSideBar"><i class="fas fa-bars"></i></div>
            <div v-if="!burgerMenu" @click="goHome" class="logo">
                <img src="./img/logo.png"/>
                <span>Gmail</span>
            </div>
            <input v-if="!isDetails" class='search-input' id="search-filter" type="text" v-model="filterBy.search" @input="filter" placeholder="Search mail"/>
            
            <label v-if="!isDetails && !burgerMenu" class='read-filter' for="read-filter">
                Read only
                <input id="read-filter" type="checkbox" v-model="filterBy.read" @change="filter"/>
            </label>
            <span  v-if="!isDetails && !burgerMenu" class="unread-count">Unread count : {{unreadCount}}</span>
            <section  v-if="!isDetails && !burgerMenu" class="sorting">
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
            sortBy: null,
            isDetails: false
        }
    },
    created() {
        eventBus.$on('detailsToggle', () => this.isDetails = !this.isDetails);
    },
    computed: {
        unreadCount() {
            return this.emails.filter(email => !email.isRead).length
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        selected() {
            console.log('this.sortBy', this.sortBy);
            this.$emit('sortBy', this.sortBy);
        },
        goHome() {
            if (!this.$route.path.includes('inbox')) this.$router.push({ path: 'inbox' });
            this.$emit('setCriteria', { status: 'inbox', starred: false });
        },
        toggleSideBar() {
            eventBus.$emit('toggleBar');
        }
    }
}