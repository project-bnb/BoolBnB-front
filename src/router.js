import {createRouter, createWebHistory} from 'vue-router';

import HomeView from './views/HomeView.vue';
import NotFound from './views/NotFound.vue';
import ApartmentShow from './views/ApartmentShow.vue';



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
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
        },
    ]
});

export default router;