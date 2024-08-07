import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/form/views/RegisterView.vue';
import LoginView from '@/form/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/'
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});

export default router;
