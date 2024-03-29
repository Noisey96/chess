/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.jsx'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['winter', 'night'],
	},
};
