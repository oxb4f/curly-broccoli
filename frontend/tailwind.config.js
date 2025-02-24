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
        'pr-error-soft': 'var(--project-error-color-soft)'
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
      }
    }
  },
  plugins: []
};
