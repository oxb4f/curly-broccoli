/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'project-main-color': 'var(--project-main-color)',
        'project-main-color-soft': 'var(--project-main-color-soft)',
        'project-main-color-mute': 'var(--project-main-color-mute)',
        'project-text-color': 'var(--project-text-color)',
        'project-text-color-soft': 'var(--project-text-color-soft)',
        'project-text-color-mute': 'var(--project-text-color-mute)',
        'project-text-color-inverted': 'var(--project-text-color-inverted)',
        'project-error-color': 'var(--project-error-color)'
      }
    }
  },
  plugins: []
}
