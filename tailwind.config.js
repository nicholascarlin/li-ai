/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			background: '#dddddd',
			primary: '#9A18C9',
			'primary-hover': '#4B1160',
			secondary: '#1F271B',
			'sub-light': '#d6d3d1',
			'sub-medium': '#78716c',
			'sub-dark': '#292524',
			danger: '#ef4444',
			'danger-hover': '#de3333',
			success: '#22c55e',
			'success-hover': '#11b44d',
			information: '#FFFF00',
			white: '#ffffff',
			transparent: 'transparent',
		},
		extend: {
			animation: {
				refresh: 'refresh 400ms linear',
			},
			keyframes: {
				refresh: {
					'0%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(180deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
		},
	},
	plugins: [],
};
