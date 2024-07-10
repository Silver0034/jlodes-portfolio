# JLodes Portfolio

This Astro project is a comprehensive web development initiative designed to showcase the professional portfolio and blog of Jacob Lodes, a seasoned full-stack developer. The project leverages Astro's modern static site generation capabilities to deliver a high-performance, SEO-friendly website. Below is a summary of the project's structure, key components, and functionalities, providing insights into its workings and the developer behind it.

## Project Structure

The project is organized into several key directories, each serving a specific purpose in the overall architecture:

-   **`src`**: Contains the Astro components for the website's pages, including the homepage (`index.astro`), blog index (`blog/index.astro`), and about page (`about.astro`). These pages integrate various components and utilities to present content dynamically.
-   **`src/content`**: Houses reusable Astro components like `BaseHead.astro`, `Header.astro`, and `Footer.astro`, which are used across different pages to ensure a consistent layout and design.
-   **`src/content/blog`**: Houses reusable Astro components like `BaseHead.astro`, `Header.astro`, and `Footer.astro`, which are used across different pages to ensure a consistent layout and design.
-   **`src/content/blog`**: Stores markdown files for blog posts, such as `astro-cloudflare-environment-variables.md`, which are rendered into static pages through Astro's content collection feature.
-   **`src/consts`**: Contains constants like `SITE_TITLE` and `SITE_DESCRIPTION`, which are used throughout the project to maintain consistency in metadata and branding.

## Key Features

### Dynamic Content Rendering

The blog functionality is a prime example of the project's dynamic content rendering capabilities. Using Astro's `getCollection` function, blog posts stored as markdown files in `src/content/blog` are fetched, sorted by publication date, and rendered into static pages. This approach allows for easy content management and ensures that the website remains fast and SEO-friendly.

### Personalized About Page

The about page (`src/pages/about.astro`) offers a personalized glimpse into Jacob Lodes' professional background and interests. It dynamically calculates the years of experience based on the `EXPERIENCE_START_YEAR` constant and showcases Jacob's journey as a full-stack developer, highlighting his work with notable brands and his expertise in PHP and JavaScript.

### Stylish and Responsive Design

The project employs modern CSS techniques to ensure a stylish and responsive design across all pages. For instance, the blog index page uses flexbox to arrange blog post summaries in a visually appealing layout, while the homepage (`src/pages/index.astro`) features engaging sections like "Who is Jacob Lodes?" to introduce visitors to the developer's work and ethos.

## Getting Started

To get started with this Astro project, clone the repository to your local machine and navigate to the project directory. Install the necessary dependencies using npm:

```bash
npm install
```

Once the dependencies are installed, you can run the project locally using the following command:

```bash
npm start
```

This command starts the Astro development server, which serves the website at `http://localhost:3000`. You can then access the website in your browser to explore its features and content.

## Conclusion

This Astro project serves as a showcase of Jacob Lodes' professional achievements and web development expertise. Through its organized structure, dynamic content rendering, and personalized details, it offers visitors a comprehensive and engaging online presence. Whether you're interested in Jacob's blog posts or looking to learn more about his professional journey, this project provides a modern and accessible platform for exploration.
