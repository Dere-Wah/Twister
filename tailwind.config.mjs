/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			transitionProperty: {
				'height': 'height'
			},
			colors: {
				'dodger-blue': {
					'50': '#eef7ff',
					'100': '#d9ecff',
					'200': '#bcdfff',
					'300': '#8ecbff',
					'400': '#59adff',
					'500': '#4294ff',
					'600': '#1b6bf5',
					'700': '#1455e1',
					'800': '#1745b6',
					'900': '#193d8f',
					'950': '#142757',
				},
			}
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
			  '.cool-scrollbar::-webkit-scrollbar': {
				width: '10px',
			  },
			  '.cool-scrollbar::-webkit-scrollbar-track': {
				background: '#ffffff',
				'border-radius': '5px',
			  },
			  '.cool-scrollbar::-webkit-scrollbar-thumb': {
				background: '#4f94ff',
				'border-radius': '5px',
				border: '3px solid #ffffff',
			  },
			  '@supports not selector(::-webkit-scrollbar)': {
				'.cool-scrollbar': {
				  'scrollbar-color': '#4f94ff #ffffff',
				},
			  },
			};
	  
			addUtilities(newUtilities);
		  },
	],
}
