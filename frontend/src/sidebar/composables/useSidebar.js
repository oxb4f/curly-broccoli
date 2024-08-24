import { HomeIcon, BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default function useSidebar() {
  const router = useRouter();

  const navigationList = {
    home: {
      icon: HomeIcon,
      toUrl: '/main'
    },
    books: {
      icon: BookOpenIcon,
      toUrl: '/books'
    },
    search: {
      icon: MagnifyingGlassIcon,
      toUrl: '/search'
    }
  };

  const currentPath = computed(() => {
    return router.currentRoute.value.path;
  });

  return {
    navigationList,
    currentPath
  };
}
