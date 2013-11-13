# Circle Chart

A very simple circular chart/dial using Raphäel and jQuery.

To use, include Raphäel, then pass an element with a number in it to the constructor. What you do with the CSS is up to you.

To give an example, you might do something like the following:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Circle Chart</title>
  <style>
    .circle-chart { width: 100px; position: relative; }
    .circle-chart__text { position: absolute; width: 100%; height: 100%; text-align: center; left: 0; top: 0; line-height: 4; font-family: sans-serif; }
  </style>
</head>
<body>

  <!-- Number goes inside a HTML element -->
  <div class="circle-chart">
    85%
  </div>

  <!-- Load the required libraries -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
  <script src="js/circle-chart.js"></script>

  <!-- Create the chart -->
  <script>
    var el = document.querySelector('.circle-chart');
    new CircleChart(el);
  </script>
</body>
</html>
```

## Options

You can pass an options object as a second parameter to the constructor. The defaults are something like the following:

```javascript
{
    stroke:   20,       // Width of the circle (in pixels)
    maxVal:   100,      // Maximum value for the chart
    colour:   '#56b7d6' // Colour of the circle (yes, with British spelling)
}
```

Released under the [MIT License](http://opensource.org/licenses/MIT).