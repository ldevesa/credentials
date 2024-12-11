/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	safelist: [
		'decoration-yellow-100', // Puedes agregar otras clases que quieras asegurar
		'text-red-500',           // Ejemplo de otro color para asegurar que no sea purgado
		// Agrega más clases según sea necesario
	],
	plugins: [],
});
