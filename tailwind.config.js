const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./node_modules/@rnr/**/*.{ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		colors: {
			primary: '#BF3335',
			gray: {
				DEFAULT: '#282828',
				500: '#1D1D1D'
			},
			black: '#030207',
			white: colors.white,
			transparent: colors.transparent,
			red: colors.red['500']
		},
		extend: {
			zIndex: {
				1: '1'
			}
		}
	},
	plugins: []
}
