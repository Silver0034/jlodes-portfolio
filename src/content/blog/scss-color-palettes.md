---
title: 'Programatically Generate Color Palettes with SCSS'
description: 'How I used SCSS to generate the color palette for my portfolio website.'
pubDate: 'Feb 20 2024'
heroImage: '/post-assets/color-palette-thumbnail.png'
---

It can be hard to create a great color palette for your website. I've found that using a tool like <a href="https://coolors.co/" target="_blank">Coolors (Opens in a new tab)</a> can help, but it can still be a challenge to find the cohesive colors that work for my projects. I recently read [Coloring With Code - A programmatic Approach To Design by George Francis on Codrops](https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/), where he uses JavaScript to generate a color palette, and I thought it would be fun to try to do the same thing with SCSS, so it can be compiled with my stylesheets during the build process.

<button class="green">Make the site green!</button>
<button class="pink">Make the site pink!</button>
<button class="blue">Make the site blue!</button>
<button class="orange">Make the site orange!</button>

## How It Integrates With My Site

At the time of writing this article, my portfolio website is built using the Astro framework and is hosted through Cloudflare Pages. Astro allows me to include SCSS files and compile them to CSS on build, rather than using native CSS files, so my site's primary stylesheet is a SCSS file that is compiled during the build process and then injected into the HTML. I wanted to be able to pick a primary color for my site, and then have the rest of the colors generated to be cohesive with that color. Each of those colors are assigned to CSS variables so they can be used throughout the site.

The first iteration of my Astro portfolio site heavily featured an orange color, and had a blue-green color as the secondary. This was pretty close to a complementary color scheme, so that is what I wanted to generate with my SCSS code.

I also wanted to make sure I had a good range of nearly white and nearly black colors, so I could use them for text and background colors.

## SCSS Functions and Maps

To get this to work, I used a SASS function to generate the color palette, and within the function utilitzed a SASS map to keep track of shades and hues.

The function spits out a map of colors in HSL format, so they can be included in style rules as CSS variables with or without the alpha channel.

### How to use a SASS function

If you are familiar with functions in other programming languages, you will be right at home with SASS functions. They are defined with the `@function` directive, and can be called with the `call()` function.

```scss
@function createPalette($hue, $saturation, $lightness) {
	// ... function code
}

$palette: createPalette(20, 90%, 45%);
```

### How to use a SASS map

SASS maps are a great way to store key-value pairs. My `createPalette()` function returns a map with the keys 'primary', 'secondary', 'lighter', 'light', 'dark', and 'darker'. Each of these keys has a value that is that color in HSL format.

In order to use a SASS map, you will have to include it's featureset in your stylesheet.

```scss
@use 'sass:map';
```

You can then create maps retrieve map values by using the `map-get()` function.

```scss
$palette: createPalette(20, 90%, 45%);

:root {
	--color-primary: map-get($palette, 'primary');
}
```

The reason I wanted my color values to be in HSL format is so I could easily adjust the opacity of the colors after they were generated. Because of the way CSS variables let you pass in values, I can use the `hsl()` function to create an opaque color, and then use the `hsla()` function to create a color with a custom transparency as needed throughout my site's styles.

Below is an example of a square with an opaque background, and another with a 50% transparent background.

<div style="display:inline-grid;width: 8em;height:8em;background-color: hsl(var(--color-primary));font-size:0.75em;place-content:center;text-align:center;line-height:1em;color:hsl(var(--color-lighter));">
 Solid <br/>Square
</div>

<div style="display:inline-grid;width: 8em;height:8em;background-color: hsl(var(--color-primary), 50%);font-size:0.75em;place-content:center;text-align:center;line-height:1em">
 Transparent <br/>Square
</div>

```scss
// --color-primary: 20, 90%, 45%;
.solid-square {
	background-color: hsl(var(--color-primary));
}

.transparent-square {
	background-color: hsla(var(--color-primary), 50%);
}
```

## How to Generate a HSL Color Palette with SCSS

1. The first step in generate a color palette is to set up the stylesheet to allow for the use of SASS maps.

2. The next step is to create a function that will return a map of colors. I called my function `createPalette()`, and it takes three arguments: `$hue`, `$saturation`, and `$lightness`.

    It uses the saturation and lightness values to create a secondary color, and then uses the hue and saturation values to create lighter and darker shades of the primary colors for use as background and text colors.

    ```scss title="Create a new function"
    @use 'sass:map';

    @function createPallette($hue, $saturation, $lightness) {
    	// ... code will go here
    }
    ```

3. Inside the function, I need to define the hue steps that I want to generate colors for. I only wanted to generate a complimentary color scheme, so I only added one hue to my hueSteps map, but you can add as many as you want. At the end of the function, the key used for the hue step will be the key used in the returned map.

    The hue steps are the number of degrees I want to shift the hue by. For a complimentary color scheme I need to shift the hue by 180 degrees. If you wanted to do a triadic color scheme, you would shift the hue by 120 degrees, and for a tetradic color scheme you would shift the hue by 90 degrees.

    ```scss title="Defining the hue steps"
    @use 'sass:map';

    @function createPallette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);
    	// ... code will go here
    }
    ```

4. Next, I need to define the lightness values I want to apply to the primary color to create my light, lighter, dark, and darker colors. You can set these up to add and subtract from the lightness like the hue steps, but I found that it made the most sense for me to choose lightness values that were static so I always end up with a nearly white, offwhite, nearly black, and dark gray color.

    I prefer when my lighter colors are really close to white and for my darker colors to be a bit lighter so more of the tint is visible, so I chose 98% for my lighter color (which I use primarily for backgrounds) and 18% for my darker color. I then chose 90% for my light color and 10% for my dark color.

    ```scss title="Defining the lightness values"
    @use 'sass:map';

    @function createPallette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);
    	$lightnessValues: (
    		'lighter': 98%,
    		'light': 90%,
    		'dark': 10%,
    		'darker': 18%
    	);
    	// ... code will go here
    }
    ```

5. Then I added a variable to store the generated colors in. I called it `$palette` and set it to an empty map.

    ```scss title="Defining the palette variable"
    @use 'sass:map';

    @function createPallette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);
    	$lightnessValues: (
    		'lighter': 98%,
    		'light': 90%,
    		'dark': 10%,
    		'darker': 18%
    	);
    	$palette: ();
    	// ... code will go here
    }
    ```

6. Next I want to add my colors for each hue in `$hueSteps`. I create a `@each` loop that iterates over the `$hueSteps` map, and then inside the loop I create a new set of colors for each hue step.

    ```scss title="Adding a loop for the hue steps"
    @use 'sass:map';

    @function createPalette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);

    	$lightnessValues: (
    		'lighter': 98%,
    		'light': 90%,
    		'dark': 10%,
    		'darker': 18%
    	);

    	$palette: ();

    	@each $name, $newHue in $hueSteps {
    		$palette: map.merge(
    			$palette,
    			(
    				$name: (
    					$hue + $newHue % 360,
    					$saturation,
    					$lightness
    				)
    			)
    		);
    	}
    	// ... code will go here
    }
    ```

7. Now that I have my primary and secondary colors being returned, I need to add the lighter and darker colors. I create another `@each` loop that iterates over the `$lightnessValues` map, and then inside the loop I create a new set of colors for each lightness value.

    ```scss title="Adding a loop for the lightness values"
    @use 'sass:map';

    @function createPalette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);

    	$lightnessValues: (
    		'lighter': 98%,
    		'light': 90%,
    		'dark': 10%,
    		'darker': 18%
    	);

    	$palette: ();

    	@each $name, $newHue in $hueSteps {
    		$palette: map.merge(
    			$palette,
    			(
    				$name: (
    					$hue + $newHue % 360,
    					$saturation,
    					$lightness
    				)
    			)
    		);
    	}

    	@each $name, $newLightness in $lightnessValues {
    		$palette: map.merge(
    			$palette,
    			(
    				$name: (
    					$hue,
    					$saturation,
    					$newLightness
    				)
    			)
    		);
    	}
    	// ... code will go here
    }
    ```

8. Finally, I return the `$palette` map.

    ```scss title="The completed function"
    @function createPalette($hue, $saturation, $lightness) {
    	$hueSteps: (
    		'primary': 0,
    		'secondary': 180
    	);

    	$lightnessValues: (
    		'lighter': 98%,
    		'light': 90%,
    		'dark': 10%,
    		'darker': 18%
    	);

    	$palette: ();

    	@each $name, $newHue in $hueSteps {
    		$palette: map.merge(
    			$palette,
    			(
    				$name: (
    					$hue + $newHue % 360,
    					$saturation,
    					$lightness
    				)
    			)
    		);
    	}

    	@each $name, $newLightness in $lightnessValues {
    		$palette: map.merge(
    			$palette,
    			(
    				$name: (
    					$hue,
    					$saturation,
    					$newLightness
    				)
    			)
    		);
    	}

    	@return $palette;
    }
    ```

9. Now all that is left is to call the function, and set the results to variables so they can be used across my portfolio site!

    ```scss title="Calling the function"
    $palette: createPalette(20, 90%, 45%);

    :root {
    	--color-primary: #{map.get($palette, 'primary')};
    	--color-secondary: #{map.get($palette, 'secondary')};
    	--color-darker: #{map.get($palette, 'darker')};
    	--color-dark: #{map.get($palette, 'dark')};
    	--color-light: #{map.get($palette, 'light')};
    	--color-lighter: #{map.get($palette, 'lighter')};
    }
    ```

## Using the Color Palette in My Site

Now that I have my color palette generated, I can use it throughout my site. I created a gradient from the `--color-light` to the `--color-lighter` to use as my site's background, and I use the `--color-darker` for my heading text with `--color-dark` for my body color. `--color-primary` is used for accents throughout the site and `--color-secondary` is used for links.

The color palette function let me quickly set up a color palette, and it enables me to easily change my site and know that the colors will still be cohesive.

<button class="green">Make the site green!</button>
<button class="pink">Make the site pink!</button>
<button class="blue">Make the site blue!</button>
<button class="orange">Make the site orange!</button>

<style>
    .green {
        --color-primary: 120, 90%, 45%;
        --color-secondary: 300, 90%, 45%;
        --color-darker: 120, 90%, 18%;
        --color-dark: 120, 90%, 10%;
        --color-light: 120, 90%, 90%;
        --color-lighter: 120, 90%, 98%;
        --gradient: linear-gradient(
            180deg,
            hsl(var(--color-light)),
            hsl(var(--color-lighter))
        );
        --box-shadow: 0 2px 6px hsla(var(--color--light) / 10%),
            0 8px 24px rgba(var(--gray-dark), 10%),
            0 16px 32px rgba(var(--gray-dark), 10%);
    }
    .pink {
        --color-primary: 330, 90%, 45%;
        --color-secondary: 510, 90%, 45%;
        --color-darker: 330, 90%, 18%;
        --color-dark: 330, 90%, 10%;
        --color-light: 330, 90%, 90%;
        --color-lighter: 330, 90%, 98%;
        --gradient: linear-gradient(
            180deg,
            hsl(var(--color-light)),
            hsl(var(--color-lighter))
        );
        --box-shadow: 0 2px 6px hsla(var(--color--light) / 10%),
            0 8px 24px rgba(var(--gray-dark), 10%),
            0 16px 32px rgba(var(--gray-dark), 10%);
    }
    .blue {
        --color-primary: 220, 100%, 40%;
        --color-secondary: 400, 100%, 40%;
        --color-darker: 220, 100%, 18%;
        --color-dark: 220, 100%, 10%;
        --color-light: 220, 100%, 90%;
        --color-lighter: 220, 100%, 98%;
        --gradient: linear-gradient(
            180deg,
            hsl(var(--color-light)),
            hsl(var(--color-lighter))
        );
        --box-shadow: 0 2px 6px hsla(var(--color--light) / 10%),
            0 8px 24px rgba(var(--gray-dark), 10%),
            0 16px 32px rgba(var(--gray-dark), 10%);
    }
    .orange {
        --color-primary: 20, 90%, 45%;
        --color-darker: 20, 90%, 18%;
        --color-lighter: 20, 90%, 98%;
    }
</style>

<script>
    function removeColors() {
        document.body.classList.remove('pink', 'blue', 'green', 'orange');
    }
    function setColor(color) {
        removeColors();
        document.body.classList.add(color);
    }
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('pink')) {
            setColor('pink');
        } else if (e.target.classList.contains('blue')) {
            setColor('blue');
        } else if (e.target.classList.contains('green')) {
            setColor('green');
        } else if (e.target.classList.contains('orange')) {
            setColor('orange');
        }
    });
</script>
