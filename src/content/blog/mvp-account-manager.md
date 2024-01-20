---
title: 'MVP Account Manager'
description: 'A custom account management page for MVP Sports Clubs'
pubDate: 'Jul 14 2021'
heroImage: '/account-page-thumbnail.png'
---

## The Account Page

I created a custom MVP Sports Clubs Account Page for users to make modifications to their accounts, check appointments and history, manage financial information, and change their account status.

I created the design for this page using a combination of Adobe Photoshop and Adobe XD and later created it from scratch in PHP, initially in Brackets and later in Visual Studio Code. This was to be loaded as a part of the custom MVP Online plugin.

The page utilizes PHP and WordPress’s URL rewrites to display the page and the information is pulled from MVP’s Member Roster API.

![The main account page](/account-main.png)

Each section is collapsible and by default are not loaded. When a user opens a tab the page uses Ajax to pull the member specific information for the signed-in user.

Each section is part of it’s own template folder in the plugin and are drawn to the page by a PHP class which is easily editable to allow sections to be added, modified, and removed by developers.

## The "Account" Section

This section lists all of the current members on the account and links to custom pages. I built this to allow users to change their membership status or update their information.

![The account members section](/account-members.png)

The My Info tab breaks down the info of the currently logged in member and has easy access to change personal information, usernames, and passwords.

![The account "my info" section](/my-info.png)

## The “Rewards” Section

The rewards section pulls information about the currently signed in user’s Health Points. These are points awarded to members for participating in classes and using the facilities.

![The account rewards section](/rewards.png)

Through this section users can view their own points, redeem rewards, link devices to their accounts, and view their point history.

## The “Appointments” Section

The appointments section pulls information about upcoming reservations and appointments for things such as tennis court rentals or personal training schedules. It also has a tab for viewing past appointments and reservations. The history table can be filtered to results for the week, month, or custom date ranges.

![The account appointments section](/appointments.png)

## The “Financial” Section

MVP Sports Clubs does not actually save the credit card information of it’s members, instead I had to use a token system to communicate with a company called Vantiv to ensure the member’s information remains secure.

The financial section allows members to change the credit card they have saved, view charge history (including in-club purchases), and change whether sub-members under their account can charge the card on file.

![The account financial section](/financial.png)

## The “Feedback” Section

The feedback section is primarily a form where users can communicate about their experiences in the clubs or in interacting with our websites.

I designed this form based off of an existing form they had included on tablets throughout the clubs and created the layout and emoji’s from scratch in Adobe XD before creating it in PHP.

![The account feedback section](/feedback.png)
