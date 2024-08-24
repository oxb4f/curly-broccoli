import { createRouter, createWebHistory } from 'vue-router';
import LoginFormView from '@/form/views/LoginFormView.vue';
import RegisterFormView from '@/form/views/RegisterFormView.vue';
import MainLayout from '../layouts/MainLayout.vue';
import AuthorizationView from '../views/AuthorizationView.vue';
import BaseSidebar from '../../sidebar/components/BaseSidebar.vue';
import UserProfileView from '../views/UserProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authorization',
      components: { main: MainLayout },
      children: [
        {
          path: '/',
          components: { content: AuthorizationView },
          children: [
            {
              path: '',
              components: { form: RegisterFormView }
            },
            {
              path: '/login',
              components: { form: LoginFormView }
            }
          ]
        }
      ]
    },
    {
      path: '/main',
      name: 'main',
      components: { sidebar: BaseSidebar, main: MainLayout },
      children: [
        {
          path: '/main',
          components: { content: UserProfileView }
        },
        {
          path: '/books',
          components: { content: LoginFormView }
        },
        {
          path: '/search',
          components: { content: RegisterFormView }
        }
      ]
    }
  ]
});

export default router;
