import {createRouter, createWebHistory} from 'vue-router';

import HomeView from './views/HomeView.vue';
import CreationPage from './views/CreationPage.vue';
import UpdatePage from './views/UpdatePage.vue';
import NotFound from './views/NotFound.vue';
import AppartmentList from './components/AppartmentList.vue';

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView 
        },
        {
            path: '/apartment-list',
            name: 'apartment-list',
            component: AppartmentList,
        },
        {
            path: '/create-apartment',
            name: 'create-apartment',
            component: CreationPage,
        },
        {
            path: '/update-apartment/:id',
            name: 'update-apartment',
            component: UpdatePage,
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
