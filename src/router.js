import {createRouter, createWebHistory} from 'vue-router';

import HomeView from './views/HomeView.vue';
import NotFound from './views/NotFound.vue';
import ApartmentShow from './views/ApartmentShow.vue';
import FilteredPage from './views/FilteredPage.vue';
import SearchResults from './views/SearchResults.vue';
import AboutUs from './views/AboutUs.vue';

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView 
        },
        {
            path: '/apartment/:id',
            name: 'apartment-show',
            component: ApartmentShow,
            props: true,
        },
        {
            path: '/apartments',
            name: 'filtered-page',
            component: FilteredPage,
        },
        {
            path: '/search-results',
            name: 'search-results',
            component: SearchResults,
        },
        {
            path: '/about',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
        },
    ]
});

export default router;