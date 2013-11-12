# Circle Chart

A very simple circular chart/dial using Raphäel and jQuery.

To use, include Raphäel and jQuery, then pass an element with a number in it to the constructor. What you do with the CSS is up to you.

To give an example, you might do something like the following:

````
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
  <script src="//codeorigin.jquery.com/jquery-2.0.3.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
  <script src="js/circle-chart.js"></script>
  <script>
    $('.circle-chart').each(function() { new CircleChart(this); });
  </script>
</body>
</html>
````