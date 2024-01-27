---
title: 'The Login Page'
description: 'A custom Log-In system for MVP Sports Clubs'
pubDate: 'Jul 14 2021'
heroImage: '/post-assets/mvp-login-thumbnail.png'
---

I designed the MVP Login Page in Adobe XD and used PHP, JavaScript, and SASS to develop it as a part of the MVP Online plugin I created for MVP Sports Clubs. This page uses the WP template loader hook and URL rewrites to display the page, and uses the MVP Member Roster API to verify credentials over HTTPS.

![The main MVP login page](/post-assets/main-login-1.png)

## The Main Login Page

This main page has a section for members to enter their username and passwords to log in. It also includes links to other sections of the login template to update passwords as well as a switch to remain logged in or only for the current session.

The forgot password page uses the Member Roster API to send an email to the user, which redirects back with a token in the URL. If the token is valid it allows the user to reset their password.

![The MVP send reset password page](/post-assets/forgot-password-main.png)

![The MVP password reset form](/post-assets/password-reset.png)
