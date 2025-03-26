/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#373f45',
        'sidebar-hover': '#2c3135',
        'main-bg': '#f5f8f8',
        'cyan': '#58bec2',
        'coral': '#c89385',
        'chart-blue': '#58bec2',
        'chart-coral': '#c89385',
        'amber': '#ca9d5a',
        'cream': '#e2c89d',
        'gray-blue': '#c2cacf',
        'nav-blue': '#3dabb4',
        'header-bg': '#354149',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-line-clamp')
  ],
};
