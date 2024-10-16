import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import { remarkReadingTime } from './src/utilities/readingTime.js'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	loaders: {
		'.scss': 'sass'
	},
	markdown: {
		remarkPlugins: [remarkReadingTime]
	},
	site: 'https://jlodes.com',
	integrations: [expressiveCode(), mdx(), sitemap()],
	vite: {
		// All global variables must also be set in global.d.ts
		define: {
			__SITE_TITLE__: JSON.stringify('Jacob Lodes'),
			__HOST_ROOT__: JSON.stringify('https://jlodes.com')
		}
	}
})
