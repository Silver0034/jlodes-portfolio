---
title: 'Breakfast Club Website in Astro JS'
description: 'My experience rebuilding "The Breakfast Club" website using Astro JS, a front-end framework optimized for fast, efficient websites.'
pubDate: 'May 25, 2024'
heroImage: '/post-assets/breakfast-club-astro.png'
---

> Update: June 6, 2024
>
> The updated <a href="https://www.thebreakfastclubla.com/" target="_blank">Breakfast Club website (opens in a new tab)</a> built in Astro has successfully launched, and it is live for users to explore.

## What is The Breakfast Club of LA

<a href="https://www.thebreakfastclubla.com/" target="_blank">"The Breakfast Club of LA" (Opens in a new tab)</a> is more than just a café; it's a culinary experience deeply rooted in the vibrant culture of Los Angeles. Founded by Earl Enterprises, it has become an iconic destination for influencers and locals alike, offering a unique blend of flavors and atmospheres.

The brand embodies the spirit of Los Angeles, celebrating diversity, creativity, and community. From its eclectic menu inspired by the city's diverse culinary landscape to its trendy, Instagram-worthy ambiance, "The Breakfast Club of LA" invites visitors to embark on a gastronomic journey like no other.

### Current Website Management

The current website for "The Breakfast Club of LA" is managed by Popmenu. However, there was a need for an alternative solution that could provide better performance, improve accessibility, and maintain the current site's look and feel.

As the developer tasked with this project, my goal was to create a highly performant website that scores well on Lighthouse audits and passes UserWay Accessibility Audits while ensuring that the site's visual identity remains consistent with the existing one.

## Features Added

### Responsive Design

Implementing responsive design principles was crucial to ensure the website looked and functioned flawlessly on various devices, from desktops to smartphones.

### Menu Integration

Utilizing Astro's static routing, I created a menu page and individual item pages for each menu item. This allows visitors to browse the café's offerings easily and learn more about each item.

![Menu Item Page](/post-assets/breakfast-club-menu-item-page.png)
_Menu Item Page_

### SEO Optimization

Various SEO optimization techniques were implemented to improve the website's visibility and attract organic traffic.

### Yext Integration

One of the most significant enhancements to the website was the integration with a third-party listing service called Yext. Earl Enterprises uses Yext to sync its location information to Google and other listing services.

I set up the Astro site to grab location information from the Breakfast Club entity using the Yext API during the build process. This ensures that the site is always up-to-date with the latest location and menu information and photos. Additionally, I configured a webhook to trigger a rebuild of the site whenever changes are made to the Breakfast Club entity or the menu entity in the Yext platform. This automated process ensures that the website reflects any updates in real-time, providing a seamless experience for visitors.

![An example of the menu](/post-assets/breakfast-club-menu-example.png)
_An example of the menu_

![Custom Carousel using images from Yext](/post-assets/breakfast-club-carousel.png)
_Custom Carousel using images from Yext_

### Environment Variables and Form Submissions

The website utilizes environment variables set in the Cloudflare Pages platform to store API credentials securely. These credentials are used to integrate with third-party services, such as Microsoft's Send API for sending email notifications.

In addition to this, the website stores information from form submissions in Cloudflare's D1 database. This allows for efficient data management and retrieval, ensuring a streamlined process for handling customer inquiries and feedback.

For some examples of setting up your own Astro site with environment variables and database connections, check out my post on [How to Develop Astro JS for Cloudflare Pages](/blog/astro-cloudflare-environment-variables/)

## The Journey

Despite not being able to share the specific reasons behind the site rebuild, the decision to move away from the Popmenu system reflects a broader need for a custom-built solution tailored to the unique requirements of "The Breakfast Club."

The main challenge during the rebuilding process revolved around integrating with Cloudflare's adapter. The documentation was fragmented across Astro JS and Cloudflare sites, making it difficult to find clear instructions for static content generation during the build phase. Through meticulous research, testing, and trial and error, I pieced together a solution that met the project's requirements.

Choosing Astro JS as the technology stack proved to be a wise decision due to its simplicity, ease of maintenance, and performance benefits. Despite tight time constraints, with only a two-week window to complete the project, Astro JS allowed for rapid development without compromising on quality.

While the project didn't undergo numerous iterations, there were adjustments made to accommodate changes in features and design. Some existing site features were discontinued, leading to page redesigns, additions, and removals.

Key learning moments revolved around utilizing environment variables in Astro with Cloudflare and Wrangler. Additionally, I gained insights into Astro's image optimization capabilities, leveraging AVIF, WebP, and JPEG formats to ensure fast loading times.

### Project Setup

In addition to Astro JS, several tools and services were instrumental in setting up the project. The Cloudflare adapter facilitated seamless integration with Cloudflare Pages, ensuring a secure and scalable hosting environment. Astros' image compile service optimized images for performance, while the @astrojs/sitemap component generated sitemap XML during the build process.

Custom TypeScript scripts were developed to handle dynamic tasks such as generating a robots.txt file tailored to the site's requirements.

### Development & Deployment Process

The development process began with solo efforts to replicate the existing site's functionality and design. Subsequently, feedback from a "Proofing Team" at Earl Enterprises led to adjustments in site features and styles.

Despite the site not yet being launched, the workflow is streamlined for continuous improvement. GitHub integration enables automatic rebuilds and deployments whenever changes are made to the codebase or the entity in the Yext listing software.

## Key Takeaways

1. Custom Solution for Unique Needs: The decision to move away from the Popmenu system underscores the importance of having a custom-built solution tailored to the specific requirements of "The Breakfast Club." Despite constraints on sharing specific motivations, the project aimed to deliver a website that reflects the brand's identity while offering enhanced performance and functionality.

2. Overcoming Challenges with Cloudflare Integration: Integrating with Cloudflare presented challenges due to fragmented documentation and the need to generate static content during the build phase. Through extensive research and testing, I developed a solution that effectively addressed these challenges, highlighting the importance of resourcefulness and adaptability in overcoming technical obstacles.

3. Choice of Technology Stack: Astro JS emerged as the preferred technology stack due to its simplicity, ease of maintenance, and performance benefits. Despite a tight timeline, Astro JS facilitated rapid development without compromising on quality, showcasing the value of selecting the right tools for the job.

4. Iterative Development Process: While the project didn't undergo numerous iterations, adjustments were made to accommodate changes in features and design. Learning moments, such as leveraging environment variables in Astro with Cloudflare and optimizing images for performance, contributed to a more refined final product.

5. Streamlined Workflow for Continuous Improvement: Despite the site not yet being launched, the workflow is designed for continuous improvement. GitHub integration enables automatic rebuilds and deployments, ensuring that the site remains up-to-date with changes to the codebase or the entity in the Yext listing software. This emphasis on automation and efficiency sets the stage for ongoing enhancements and optimizations post-launch.

![Desktop Homepage](/post-assets/breakfast-club-homepage.png)
_Desktop Homepage_
