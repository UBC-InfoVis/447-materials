# Basic Interactivity

In this tutorial, we present further examples on mouse events, animated transitions, and tooltips.

#### Tutorial Outline

1. [Handling User Input](#handling-user-input)
2. [Animated Transitions](#animated-transitions)
3. [Tooltips](#tooltips)

## 1. <a name="handling-user-input">Handling User Input</a>

With D3 visualizations, you can leverage the full power of web technologies to create interactive visualizations. For example, you can add HTML forms to enable user input or bind event listeners directly to SVG elements.

We can bind an event listener to any DOM element using `d3.selection.on()` method. We show this in the following example where we use an HTML input slider to change the radius of an SVG circle.

*HTML*

```html
<!-- ... -->
<body>
    <!-- HTML form -->
    <div>
        <label for="radius-slider">Radius: <span id="radius-value">60</span></label>
        <input type="range" min="1" value="60" max="80" id="radius-slider">
    </div>

    <!-- Empty SVG drawing area -->
    <svg id="chart" width="200" height="200"></svg>

    <script src="js/d3.v6.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

*JS*

```javascript
const svg = d3.select('svg');

// Show circle with initial radius of 60px
const circle = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('r', 60);

function updateCircle(radius) {
  circle.attr('r', radius);
}
```

```javascript
// Event slider for input slider
d3.select('#radius-slider').on('input', function() {
  // Update visualization
  updateCircle(parseInt(this.value));

  // Update label
  d3.select('#radius-value').text(this.value);
});
```

*Result*

![Change radius via slider](images/input_slider_radius_example.gif?raw=true "Change radius via slider")

You can see the complete example on [codesandbox](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-change-radius-with-slider) and change the code interactively.

This was a very simple example. We have the following recommendations when you use the previously introduced class structure for visualizations:

* Add global event listeners (e.g., checkboxes, sliders, ...) in `main.js`. The advantage is that `main.js` acts as a controller and you can trigger changes in multiple visualization components.
* Update configurations (e.g., `myChart.config.radius = 100`) or data (i.e., `myChart.data = data`).
* Call `myChart.updateVis()` to update the visualization accordingly.
* Add chart-specific events within the `myChart.js` class. For example, when you want listen to *mouseover* events on SVG circles, use D3's `.on()` function when you render the circles:

	```javascript
	svg.selectAll('circle')
   		.data(data)
	  .join('circle')
      	.attr('fill', 'green')
      	.attr('r', 4)
      	.attr('cx', d => vis.xScale(d.x))
      	.attr('cy', d => vis.yScale(d.y))
      	.on('mouseover', d => console.log('debug, show tooltip, etc.'))
	```

Alternatively, you could also use [jQuery](http://jquery.com/) or other JS libraries to handle events.

&nbsp;

## 2. <a name="animated-transitions">Animated Transitions</a>

By now, you should have a solid understanding of how to select elements and update various types of SVG attributes:

```javascript
d3.selectAll('circle').attr('fill', 'blue');
```

We selected all *circles* and changed the *fill color*.

D3 evaluates every *attr()* statement immediately, so the changes happen right away. But sometimes it is important to show the user what's happening between the states and not just the final result. D3 provides the `transition()` method that makes it easy to create these smooth, animated transitions between states:

```javascript
d3.selectAll('circle').transition().attr('fill", 'blue');
```

When you add `.transition()`, ***D3 interpolates between the old values and the new values***, meaning it normalizes the beginning and ending values, and calculates all their in-between states.

In our second example, the circle color changes from red to blue over time. The default time span is 250 milliseconds but you can specify a custom value by simply using the `duration()` method directly after `transition()`. We assume there are existing red circles on the web page.

This example shows an animation from red to blue (3 seconds):

```javascript
d3.selectAll('circle')
	.transition()
	.duration(3000)
	.attr('fill', 'blue');
```
![Transition with duration](images/transition-duration.gif?raw=true "Transition with duration")

If you need to delay an animation, you can add the `delay()` method right after `transition()`.

#### Transitions Are Per-Element and Exclusive

> *"Each element transitions independently. When you create a transition from a selection, think of it as a set of transitions, one per element, rather than a single mega-transition running on multiple elements. Different elements can have different delays and duration, and even different easing and tweens. Additionally, transition events are dispatched separately for each element. When you receive an end event for a given element, its transition has ended, but other transitions may still be running on other elements."* <br> &raquo; [http://bost.ocks.org/mike/transition/](http://bost.ocks.org/mike/transition/))


### Animation for Visualization

If done right, animations can make a visualization better and help engage the user. If done wrong (i.e., you don't follow key principles), you will achieve exactly the opposite results.

#### Pros

- Transitions show what is happening between states and add a sense of continuity to your visualization
- Animations can draw the user's attention to specific elements or aspects
- Animations can provide the user with interactive feedback


#### Cons
- Too many transitions will confuse the user (e.g., overused PowerPoint effects)
- If the transition is not continuous, animations look strange and can even be deceiving based on the interpolation used.
- Animation across many states is the least effective use case for
data analysis tasks. In this case, use a static comparison of several charts/images (e.g., small multiples) instead of creating video-like animations.

&nbsp;

## 3. <a name="tooltips">Tooltips</a>

### HTML tooltips

When you create interactive visualizations, you often want to show tooltips to reveal more details about your data to your audience. There are different approaches to achieve this but we recommend the creation of a global tooltip container outside of the SVG that you can show/hide and position whenever users hover over a mark. This approach allows you to create more complex tooltip objects that can be styled with CSS and contain images or even small visualizations.

Example implementation workflow:

* Add tooltip placeholder to the *HTML* file:

	```html
	<div id="tooltip"></div>
	```

* Set absolute position, hide tooltip by default, and define additional optional styles in *CSS*:

	```css
	#tooltip {
		position: absolute;
		display: none;
		/* ... other tooltip styles ... */
	}
	```
* In *JS* (D3), update tooltip content, position, and visibility when users hovers over a mark. We distinguish between three different states: `mouseover`, `mousemove`, and `mouseleave` (in case of small marks, we add the positioning to the `mouseover` function and leave out `mousemove`).

	```js
	myMarks
        .on('mouseover', (event,d) => {
          d3.select('#tooltip')
            .style('display', 'block')
            // Format number with million and thousand separator
            .html(`<div class="tooltip-label">Population</div>${d3.format(',')(d.population)}`);
        })
        .on('mousemove', (event) => {
          d3.select('#tooltip')
            .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
            .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
        })
        .on('mouseleave', () => {
          d3.select('#tooltip').style('display', 'none');
        });
	```

#### Examples

[Sortable bar chart with tooltips](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-bar-chart)

![Interactive Bar Chart](images/interactive_bar_chart_example.gif?raw=true "Interactive Bar Chart")

[![Codesandbox: Interactive Bar Chart](images/codesandbox_d3-interactive-bar-chart.png?raw=true "Codesandbox: Interactive Bar Chart")](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-bar-chart)

[Interactive scatter plot with filters and tooltips](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-scatter-plot)

![Interactive Scatter Plot](images/interactive_scatter_plot_example.gif?raw=true "Interactive Scatter Plot")

[![Codesandbox: Interactive Scatter Plot](images/codesandbox_d3-interactive-scatter-plot.png?raw=true "Codesandbox: Interactive Scatter Plot")](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-scatter-plot)

### Tooltips for path elements (fuzzy position)

Until now, we have created tooltips only for basic SVG elements, such as circles or rectangles. When users hover over a specific mark, we can easily get the underlying data and show it at that position. However, when we create line or area charts (SVG paths), we typically want to allow users to hover anywhere over a path and see a tooltip, and not just at a few specific points.

![Tooltip position](images/tooltip_position.png?raw=true "Tooltip position")

We illustrate the mechanism for showing tooltips at fuzzy positions based on a line chart (`date` on x-axis, `stock price` on y-axis).

1. We add a tracking area that covers the whole chart. Whenever users place their mouse cursor inside this area, we want to show a tooltip. After every `mousemove` event we need to update the tooltip accordingly.

	```js
	const trackingArea = vis.chart.append('rect')
	    .attr('width', width)
	    .attr('height', height)
	    .attr('fill', 'none')
	    .attr('pointer-events', 'all')
	    .on('mouseenter', () => {
          vis.tooltip.style('display', 'block');
        })
        .on('mouseleave', () => {
          vis.tooltip.style('display', 'none');
        })
        .on('mousemove', function(event) {
	      // See code snippets below
	    })
	```

2. Get the x-position of the mouse cursor using `d3.pointer()`. We only want to show a stock price tooltip for a specific date and the y-position is not relevant in this case, but can be extracted similarly.

	```js
	const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
	```

3. We have used D3 scales multiple times to convert data values (input domain) to pixels (output range). We can now use the `invert()` function to do the opposite and get the date that corresponds to the mouse x-coordinate.

	```js
	const date = vis.xScale.invert(xPos);
	```

4. We want to find the data point (stock price) based on the selected date. Therefore, we use a special helper function `d3.bisector` that returns the nearest `date` (in our dataset) that falls to the left of the mouse cursor.

	We initialize the d3.bisector somewhere outside of `.on('mousemove')`:

	```js
	const bisect = d3.bisector(d => d.date).left;
	```

	Then we can use `biscect()` to find the nearest object `d` in our dataset.<br>
	(Don't worry too much if this looks cryptic to you. Read more details in these tutorials: [d3noob.org](http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html), [observable](https://observablehq.com/@d3/d3-bisect))

	```js
	const index = vis.bisectDate(vis.data, date, 1);
  	const a = vis.data[index - 1];
  	const b = vis.data[index];
  	const d = b && (date - a.date > b.date - date) ? b : a;
  	// d contains: { date: ..., stockPrice: ... }
	```

	At the end we can display an HTML or SVG tooltip with the available mouse coordinates and the corresponding data.

See the complete interactive line chart example on [codesandbox](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-line-chart).

![Interactive line chart](images/interactive_line_chart_example.gif?raw=true "Interactive line chart")

[![Codesandbox: Interactive Line Chart](images/codesandbox_d3-interactive-line-chart.png?raw=true "Codesandbox: Interactive Line Chart")](https://githubbox.com/UBC-InfoVis/2021-436V-examples/tree/master/d3-interactive-line-chart)

---

*Sources:*

* [Harvard's visualization course (CS171)](https://www.cs171.org/)
* [http://www.d3noob.org/2014/04/using-html-inputs-with-d3js.html](http://www.d3noob.org/2014/04/using-html-inputs-with-d3js.html)