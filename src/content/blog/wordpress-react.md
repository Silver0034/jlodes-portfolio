---
title: 'Running a React App Through WordPress'
description: ''
pubDate: 'Jul 23 2024'
heroImage: ''
---

In this tutorial, we will be exploring how to run a React app through WordPress. This tutorial assumes that you have a basic understanding of React and familiarity with PHP and the way WordPress Core works.

## Why add React to WordPress?

WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database. It works great at managing content, but it is not the best at creating dynamic, interactive user interfaces. React can be used to create a dynamic, interactive user interface.

## How to add React to WordPress

### Step 1: Create a folder in your theme or plugin directory

In my example, I will be adding React to a plugin. You will also need to make sure you have Node.js installed on your computer.

Create a new folder in the theme or plugin you want to add React to. I will be adding React to a plugin, so I will create a folder called `react-app` in my plugin's directory.

### Step 2: Create a React app in the folder

Open a terminal in the `react-app` directory and create a new react app.

```bash
npx create-react-app .
```

Then follow the instructions in the wizard to create a new React app.

Replace the React and ReactDOM imports with the render method from wp.element, and the root.render method with the render method from wp.element.

```js
// Remove the React & ReactDOM imports
//import React from 'react'
//import ReactDOM from 'react-dom/client'

// Import the render function from wp.element
const { render } = wp.element
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

if (document.getElementById('root')) {
	//check if element exists before rendering
	render(<App />, document.getElementById('root'))
}

reportWebVitals()
```

### Step 3: Create a PHP file in the folder

### Step 4: Add shortcode to the PHP file

### Step 5: Enqueue the React app

```

```
