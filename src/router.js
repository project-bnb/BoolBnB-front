import {createRouter, createWebHistory} from 'vue-router';

import CreationPage from './views/CreationPage.vue';
import NotFound from './views/NotFound.vue';
import AppartmentList from './components/AppartmentList.vue';

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomePage 
        // },
        {
            path: '/create-apartment',
            name: 'create-apartment',
            component: CreationPage,
        },
        {
            path: '/apartment-list',
            name: 'apartment-list',
            component: AppartmentList,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
          },
    ]
});

export default router;
