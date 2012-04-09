### Welcome to the CanvasPong Tutorial
I will show you how to build the famous game **Pong** in a HTML5 **canvas tag**. This tutorial is for beginners in HTML5, to get in touch with the canvas element and how to build simple games with *JavaScript*. I won't explain every code snipped in detail but the most important ones will be explained.  
You should be familiar with **HTML** and **JavaScript**.  
If you find any kind of mistakes (either spelling/grammar mistakes or code mistakes) don't hesitate to contact me.

### What will it look like?
Before we start with the tutorial, I show you what *CanvasPong* will look at the end.  
![CanvasPong](http://linkToThePicture)

### Let's start creating *index.html*
The new canvas tag in HTML5 is a simple but powerful tag. To use it we create the simple index.html file.

	<!DOCTYPE html>
	<html>
	<head>
	<link rel="stylesheet" href="style.css" type="text/css" media="screen" />
	</head>
	<body>
	<canvas id="canvasPong" width="700" height="500">
		<p>Oh no! Your Browser does not support the canvas tag.</p>
	</canvas>
	<button id="but" onclick="setUp.init()">Start</button>
	<script src="cpong.js" type="text/javascript"></script>
	</body>
	</html>

In the first line we declare the **Doctype** of html. This is the new HTML5 Doctype; it's simple and short. In our `head` I link to a CSS stylesheet.  
If you look now in the `body` you see the new `canvas`-tag.

	<canvas id="canvasPong" width="700" height="500">
		<p>Oh no! Your Browser does not support the canvas tag.</p>
	</canvas>

We give it the *id* "canvasPong". We need this 1) to style it in css and 2) to call it in JavaScript (JS). It's important to give it a width and height. I did it in the tag itself, but you can also use widht and height in the stylesheet.  
The `p`-tag in the `canvas`-tag will only be displayed if a browser does not support HTML5 and its canvas element. It's not necessary to use this fallback, but I recommend it. Because a lot of people are still using non-HTML5 browser.  
Finally, we close the tag.

To think ahead, let's create a button which will start our game in future. It gets an id and its value is "Start". If you click the button it will call the function "setUp.init()" because our button has the attribute "onclick".

Last but not least, we create a `script`-tag. Our source will be "cpong.js" of type "text/javascript". This file will contain all the magic and the main work.

If you open *index.html* in your browser you'll see ... nothing. But don't panic - that's normal. Canvas will only reserve the space on your website and nothing else.

### Make Canvas visible
I think it is useful to see the canvas element. To make it visible we create a css file named "style.css" and will be placed in the same folder as index.html. It will only put a black border around this tag.

	#canvasPong {
		border: 1px solid #000;
	}

### Create the JS-File



### Author
bla bla bla

### Support or Contact
Having trouble with the tutorial or did you find a mistake? Contact me at tutorial@hanshelgebuerger.de and I’ll help you sort it out.