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

Open a terminal in the `react-app` directory and create a new React app.

```bash title="Create a new React app"
npx create-react-app .
```

Then follow the wizard instructions to create a new React app. Once your React app has been created, install the `@wordpress/scripts` package.

```bash title="Install the @wordpress/scripts package"
npm install @wordpress/scripts --save-dev
```

Then open the `/react-app/package.json` file and add the following scripts.

```json title="Add the following scripts to the package.json file"
"scripts": {
	"start": "wp-scripts start",
	"build": "wp-scripts build",
}
```

In your `/src/index.js` file, replace the React and ReactDOM imports with the render method from wp.element, and the root.render method with the render method from wp.element.

```js title="/react-app/src/index.js" del={"1":1-2} ins={"2": 3} del={"3":8-13} ins={"4": 15-17}
import React from 'react'
import ReactDOM from 'react-dom/client'
const { render } = wp.element
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

if (document.getElementById('root')) {
	render(<App />, document.getElementById('root'))
}

reportWebVitals()
```

Then you can run `npm start` to build your React app.

```bash title="Run the React app"
npm start
```

### Step 3: Create a PHP file in the folder

Create a new PHP file in the `react-app` folder. I will be calling my file `index.php`. You will want to set up the file to register the react script and styles, and render the app via a shortcode. In my example, I am using "ra" as a prefix to help prevent conflicts with other plugins.

```php title="/react-app/index.php"
<?php
if (!defined('ABSPATH')) die('No direct access permitted.');

// Register the script
ra_register_script() {
	// Register the script
	wp_register_script(
		'react-app',
		plugin_dir_url(__FILE__) . '/build/index.js',
		['wp-element'],
		'1.0.0',
		true
	);
}
add_action('wp_enqueue_scripts', 'ra_register_script');

// Register the styles
ra_register_styles() {
	// Register the styles
	wp_register_style(
		'react-app',
		plugin_dir_url(__FILE__) . '/build/index.css',
		[],
		'1.0.0',
		'all'
	);
}
add_action('wp_enqueue_scripts', 'ra_register_styles');

// Register the shortcode
function ra_register_shortcode() {
	add_shortcode(
		'ee-olo-ordering',
		[$this, 'ra_render_shortcode']
	);
}
add_action('init', 'ra_register_shortcode');

// Render the shortcode
function ra_render_shortcode() {
	// Enqueue the script & styles
	wp_enqueue_script('react-app');
	wp_enqueue_style('react-app');

	// Render the shortcode
	return '<div id="root"></div>';
}
```

### Step 4: Include the PHP file in your theme or plugin

In your theme or plugin's main PHP file, include the PHP file you created in step 3.

```php title="Include the PHP file"
include_once('react-app/index.php');
```

### Step 5: Add the shortcode to your WordPress site

Now you can add the shortcode to a page on your WordPress site. Voila! You now have a React app running through WordPress!

```
[ra-react-app]
```

When you are ready to build your React app for production, you can run `npm build` to build your React app.
