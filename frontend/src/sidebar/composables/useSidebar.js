import BaseProfilePhoto from '@/app/components/BaseProfilePhoto.vue';
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/vue/24/outline';

export default function useSidebar() {
  const navigationList = {
    roots: {
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
    },
    options: {
      settings: {
        icon: Cog8ToothIcon,
        toUrl: '/settings'
      },
      logout: {
        icon: ArrowLeftStartOnRectangleIcon,
        toUrl: ''
      }
    },
    profile: {
      icon: BaseProfilePhoto,
      toUrl: '/profile'
    }
  };

  return {
    navigationList
  };
}
