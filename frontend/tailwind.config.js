/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'project-main-color': 'var(--project-main-color)',
        'project-main-color-soft': 'var(--project-main-color-soft)',
        'project-main-color-mute': 'var(--project-main-color-mute)',
        'project-bg-main-color': 'var(--project-bg-main-color)',
        'project-bg-secondary-color': 'var(--project-bg-secondary-color)',
        'project-bg-hover-color': 'var(--project-bg-hover-color)',
        'project-bg-disable-color': 'var(--project-bg-disable-color)',
        'project-border-color': 'var(--project-border-color)',
        'project-text-color': 'var(--project-text-color)',
        'project-text-color-darker': 'var(--project-text-color-darker)',
        'project-text-color-inverted': 'var(--project-text-color-inverted)',
        'project-error-color': 'var(--project-error-color)',
        'project-error-color-soft': 'var(--project-error-color-soft)'
      },
      fontFamily: {
        'project-font': 'var(--project-font)',
        'project-logo-font': 'var(--project-logo-font)'
      },
      borderWidth: {
        1: '1px'
      }
    }
  },
  plugins: []
};
