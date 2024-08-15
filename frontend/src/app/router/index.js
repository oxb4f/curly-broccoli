import { createRouter, createWebHistory } from 'vue-router';
import LoginFormView from '@/form/views/LoginFormView.vue';
import RegisterFormView from '@/form/views/RegisterFormView.vue';
import AuthorizationView from '../views/AuthorizationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authorization',
      component: AuthorizationView,
      children: [
        {
          path: '/',
          component: RegisterFormView
        },
        {
          path: '/login',
          component: LoginFormView
        }
      ]
    }
  ]
});

export default router;
