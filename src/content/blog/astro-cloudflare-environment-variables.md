---
title: 'How to Develop Astro JS for Cloudflare Pages'
description: 'A guide on developing and deploying Astro JS on Cloudflare Pages with environment variables and database connections.'
pubDate: 'Apr 18 2024'
heroImage: '/post-assets/astro-in-cloudflare-thumbnail.png'
---

I recently undertook a project where I needed to set up an Astro JS project on Cloudflare Pages. Initially, the process was straightforward, allowing me to publish the site much like this blog post. However, the project required generating content from an API and storing form responses in a database, necessitating the implementation of Server-Side Rendering (SSR).

During this setup, I encountered challenges with configuring Astro JS using the Cloudflare Adapter and Wrangler to manage environment variables and database connections. The necessary documentation was dispersed across multiple sources, making it difficult to piece together. To help others who may face similar issues, I decided to write this guide.

This guide provides a brief overview of setting up an Astro JS project on Cloudflare Pages and then delves into the specifics of configuring environment variables and establishing database connections. I hope you find it helpful!

## Prerequisites

Before diving into the setup of Astro JS on Cloudflare Pages, ensure you have the following prerequisites:

-   **Basic Knowledge of JavaScript and Static Site Generators**: Familiarity with JavaScript and an understanding of static site generators (SSGs) will help you navigate through the setup process more effectively. If you are new to SSGs, consider reviewing introductory resources or tutorials on Astro JS and its core concepts.

-   **Node.js Installed**: Ensure you have Node.js installed on your local machine. Node.js is essential for running the Astro CLI and managing project dependencies. You can download and install the latest version of Node.js from the [official website](https://nodejs.org/).

-   **Cloudflare Account**: Create an account on Cloudflare if you haven't already. Cloudflare Pages is a part of the Cloudflare ecosystem, and you will need an account to deploy your site. Sign up for free on the [Cloudflare website](https://www.cloudflare.com/).

-   **Git Version Control**: Ensure you have Git installed and configured on your local machine. Git is necessary for managing your project's source code and for deploying it to Cloudflare Pages. Download and install Git from the [official website](https://git-scm.com/).

-   **Text Editor or IDE**: Use a text editor or Integrated Development Environment (IDE) that you are comfortable with. Popular choices include Visual Studio Code, Sublime Text, and JetBrains WebStorm. These tools will help you edit your project files and manage your code efficiently.

## Set up a Astro Project in Cloudflare Pages

### Step 1: Create a New Astro Project

The first step is to create a new Astro project. You can create one in your current directory by opening the terminal and using the following command:

```bash
npm create astro@latest
```

Follow the prompts to set up your project. Once the project is created, you can add pages and content as you would any other Astro project.

### Step 2: Save your project in a Git repository

To deploy your Astro project to Cloudflare Pages, you need to save your project in a Git repository. Initialize a new Git repository in your project directory by running the following commands:

```bash
git init
git add .
git commit -m "Initial commit"
```

You will then need to push your project to a remote repository. If you haven't set up a remote repository yet, create one on GitHub, GitLab, or any other Git hosting service. Push your project using the following commands:

```bash
git remote add origin <remote-repository-url>
git push -u origin main
```

### Step 3: Push your project to Cloudflare Pages

To deploy your Astro project to Cloudflare Pages, you need to connect your Git repository to Cloudflare. Follow these steps:

1. Log in to your Cloudflare account and navigate to the Cloudflare Pages dashboard.

2. Click on the "Create a project" button.

3. Select the Git provider where your repository is hosted (GitHub, GitLab, or Bitbucket).

4. Authorize Cloudflare to access your Git repository.

5. Choose the repository and branch you want to deploy.

6. Configure the build settings for your project. You can use the default settings or customize them based on your project requirements.

7. Click on the "Begin setup" button to start the deployment process.

Cloudflare Pages will build and deploy your Astro project automatically. Once the deployment is complete, you will receive a unique URL where your site is hosted.

## Set up Environment Variables & Database Connections

### Set up the Cloudflare Adapter

Astro includes a official integration for Cloudflare, and has an adapter ready to use. To add the Cloudflare adapter to your project, run the following command:

```bash
npx astro add cloudflare
```

This will install `@astrojs/cloudflare` and will update your `astro.config.mjs` file to include the Cloudflare adapter.

### Setting up Wrangler

Cloudflare uses a service called Wrangler to deploy sites, and you can add environment variables to your project using Wrangler.

Create a `wrangler.toml` file in the root of your project and add name and pages_build_output_dir fields.

```toml
name = "my-astro-project"
pages_build_output_dir = "./dist"
```

Next, make sure you set up your platformProxy in your `astro.config.mjs` file to use the Cloudflare adapter.

```js
export default defineConfig({
	platformProxy: {
		enabled: true,
		configPath: 'wrangler.toml'
	}
})
```

### Set up Cloudflare D1 Database Connections

If you need to connect to a database, you can set up a connection using Cloudflare D1. First, create a new database in the Cloudflare dashboard and note the database name and ID.

Next, add the database connection to your project by adding the following fields to your `wrangler.toml` file:

```toml
[[d1_databases]]
binding = "DB"
database_name = "my_d1_db_name"
database_id = "my_db_id"
```

You will be able to connect to your database in your project using the `DB` binding. Below is an example of a POST api route that saves a user's name to a database table named 'users' with one column called 'name'.

```ts
// Save user's name to the database
const dbTableName = 'users'

export async function POST(context: {
	request: { json: () => any }
	locals: { runtime: { env: { DB: { prepare: (arg0: string) => any } } } }
}) {
	const requestBody = await context.request.json()
	const DB = context.locals.runtime.env.DB

	const userName = requestBody.name

	// Note: Always sanitize user input before using it in a SQL query

	const sql = `INSERT INTO ${dbTableName} (name) VALUES (${userName})`

	try {
		await DB.prepare(sql).run()
	} catch (error) {
		return new Response("Error saving user's name to database", {
			status: 500
		})
	}

	return new Response('User name saved to database', { status: 200 })
}
```

### Environment Variables

#### Add local environment variables

Create a `.env` file in the root of your project and add your environment variables.

```env
SECRET_PASSWORD=password123
PUBLIC_ANYBODY=there
```

#### Adding environment variables through Cloudflare's Dashboard

You can open up your cloudflare pages dashboard for your project and go to the `Settings` tab. There is a section for environment variables where you can add Production and Preview variables. With wrangler set up in the project you will only be able to save and read secret environment variables from the dashboard. Non-secret environment variables can be read from the `wrangler.toml` file.

#### Reading environment variables in your project

Managing environment variables in static sites can be challenging. Cloudflare typically necessitates a request to a serverless function for accessing environment variables through the import meta.

In my experience, I discovered that import.meta.env doesn't function as expected in Cloudflare Pages. Instead, environment variables can be accessed using process.env. To ensure compatibility across different environments, I employ a ternary operator to handle both scenarios, enabling seamless execution of code both locally and on Cloudflare Pages.

```js
const myVar = import.meta.env.YOUR_ENV_VARIABLE ?? process.env.YOUR_ENV_VARIABLE
```

## A Note about Image Optimization

While setting up the Cloudflare adapter in Astro JS, I encountered some challenges with image optimization. By default, Astro JS tends to utilize the Cloudflare image service, which optimizes images during runtime. However, I preferred to leverage Astro's built-in image service, which optimizes images during the build process.

To achieve this, you'll need to configure the Cloudflare adapter to use the 'compile' imageService option. This adjustment ensures that your images are optimized at build time, aligning with Astro's optimization approach.

```js
export default defineConfig({
	platformProxy: {
		enabled: true,
		configPath: 'wrangler.toml'
	},
	adapter: cloudflare({
		imageService: 'compile'
	})
})
```

Then you can add your image entrypoint and remote patterns for optimizing remote images if needed.

```js
export default defineConfig({
	platformProxy: {
		enabled: true,
		configPath: 'wrangler.toml'
	},
	adapter: cloudflare({
		imageService: 'compile'
	}),
	image: {
		entrypoint: 'compile',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'external-image-host-domain.com'
			}
		]
	}
})
```

## Conclusion

In conclusion, setting up an Astro JS project on Cloudflare Pages allows you to leverage the strengths of both platforms—Astro's modern static site generation capabilities and Cloudflare's powerful deployment infrastructure. By following the steps outlined in this guide, you can create a highly optimized, scalable, and easy-to-manage web application. With proper configuration of environment variables and database connections, your Astro JS site will be well-equipped to handle various dynamic functionalities. Continue exploring and expanding your knowledge by referring to additional resources and documentation to further enhance your development skills and project outcomes.
