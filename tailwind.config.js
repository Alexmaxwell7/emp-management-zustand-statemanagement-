module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				customColor: '#123456'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
				scale: {
				  '75': '.75',
				},
				screens: {
				  xs: '320px',
				  '2xl': '1400px',
		  
				  // => @media (min-width: 320px) { ... }
		  
				  sm: '576px',
				  // => @media (min-width: 575px) { ... }
		  
				  md: '768px',
				  // => @media (min-width: 768px) { ... }
		  
				  lg: '992px',
				  // => @media (min-width: 992px) { ... }
		  
				  xl: '1200px',
				  // => @media (min-width: 1200px) { ... }
		  
				  '3xl': '1600px',
				  // => @media (min-width: 1600px) { ... }
				},
				width: {
					inherit: 'inherit',
				  },
			  },
			  boxShadow: {
				'custom-shadow': '0 4px 30px rgba(100, 186, 224, 0.3)', // Adjust color and size as needed
			  },
			  backgroundImage: {
				'custom-image': "url('https://img.freepik.com/free-vector/network-connection-background_23-2148879892.jpg')",
				// Add more images as needed
			  },
	},
	plugins: [],
}