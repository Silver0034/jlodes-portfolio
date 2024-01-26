import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import { remarkReadingTime } from './src/utils/readingTime.js'
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
	integrations: [expressiveCode(), mdx(), sitemap()]
})
