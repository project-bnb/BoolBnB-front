import {createRouter, createWebHistory} from 'vue-router';

import CreationPage from './views/CreationPage.vue';
import NotFound from './views/NotFound.vue';

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
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
          },
    ]
});

export default router;
