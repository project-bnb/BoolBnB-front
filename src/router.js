import {createRouter, createWebHistory} from 'vue-router';

import HomeView from './views/HomeView.vue';
import CreationPage from './views/CreationPage.vue';
import UpdatePage from './views/UpdatePage.vue';
import NotFound from './views/NotFound.vue';
import ApartmentList from './components/ApartmentList.vue';
import ApartmentShow from './views/ApartmentShow.vue';
import Login from './UserAuth/Login.vue';
import Register from './UserAuth/Register.vue';
import ConfirmDeletePage from './views/ConfirmDeletePage.vue';


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
            component: ApartmentList,
            props: true,
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
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
          },
        {
            path: '/apartment/:id',
            name: 'apartment-show',
            component: ApartmentShow,
            props: true,
        },
        {
            path: '/confirm-delete/:id',
            name: 'confirm-delete',
            component: ConfirmDeletePage,
            props: true,
        },
    ]
});

export default router;
