/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pr-main': 'var(--project-main-color)',
        'pr-main-soft': 'var(--project-main-color-soft)',
        'pr-main-mute': 'var(--project-main-color-mute)',
        'pr-bg-main': 'var(--project-bg-main-color)',
        'pr-bg-secondary': 'var(--project-bg-secondary-color)',
        'pr-bg-tertiary': 'var(--project-bg-tertiary-color)',
        'pr-bg-hover': 'var(--project-bg-hover-color)',
        'pr-bg-disable': 'var(--project-bg-disable-color)',
        'pr-border': 'var(--project-border-color)',
        'pr-text': 'var(--project-text-color)',
        'pr-text-darker': 'var(--project-text-color-darker)',
        'pr-text-inverted': 'var(--project-text-color-inverted)',
        'pr-error': 'var(--project-error-color)',
        'pr-error-soft': 'var(--project-error-color-soft)',
        'pr-important': 'var(--project-important-color)',
        'pr-important-soft': 'var(--project-important-color-soft)',
        'pr-important-mute': 'var(--project-important-color-mute)',
        'pr-rating': 'var(--project-rating-color)',
        'pr-rating-mute': 'var(--project-rating-color-mute)'
      },
      fontFamily: {
        'pr-main': 'var(--project-font)',
        'pr-logo': 'var(--project-logo-font)'
      },
      borderWidth: {
        1: '1px'
      },
      gridTemplateRows: {
        hide: 'min-content 0fr',
        show: 'min-content 1fr'
      },
      animation: {
        'slide-in-from-right-full': 'slideInFromRightFull 0.8s ease-in-out 0.6s both',
        'slide-in-from-left-1/3': 'slideInFromLeftThird 0.8s ease-in-out 0.6s both',
        'faded-slide-in-from-top-full': 'fadedSlideInFromTopFull 0.2s ease-out',
        bump: 'bump 0.6s ease-out'
      },
      keyframes: {
        slideInFromRightFull: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' }
        },
        slideInFromLeftThird: {
          from: { transform: 'translateX(-33%)' },
          to: { transform: 'translateX(0)' }
        },
        fadedSlideInFromTopFull: {
          from: { opacity: '0', transform: 'translateY(-100%)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        bump: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: []
};
