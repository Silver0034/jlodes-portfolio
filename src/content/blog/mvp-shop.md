---
title: 'MVP Shop'
description: 'A dynamic shop built from scratch for MVP Sports Clubs'
pubDate: 'Jul 14 2021'
heroImage: '/post-assets/gift-card-thumbnail.png'
---

I designed a shop page for MVP Sports Clubs in Adobe Photoshop and then built it for WordPress in PHP, JavaScript, and CSS via SASS as a template in the MVP Online plugin that I created for the company. It is loaded as a part of the site’s template loader hook utilizing WP’s URL rewrites. It requests info from MVP’s API based off the product ID in the URL and can display product pages for many different products as long as they are set up in the mySQL database connected to the API.

The shop pages connects to the Universal Cart API I helped design that is also used in [Membership Sales](/blog/membership-sales/) and when you click to add a product to your cart it will do so and then redirect you to the universal cart page.

![The gift card sales page from the RDV Sportsplex Website](/post-assets/gift-card.png)
