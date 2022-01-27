# Programming Assignment 1

*Due on Feb 11 2022, 6:00pm.*

*Remember to submit all modified files to Gradescope before the due date*

This programming assignment assumes that you have fulfilled all course prerequisites and followed along with the D3 tutorials.

### Template and Submission

We will use **git** repositories for all programming assignments and project milestones. You should already be well acquainted with the process and all necessary git commands from the previous programming assignment.

We created a git repository in your github student account ([https://github.students.cs.ubc.ca/](https://github.students.cs.ubc.ca/)) that contains a template that should help you get started. The dataset is included in the /data folder. You will need to modify the .html, .js, and .css files as described below. Don't add new files.

You must work alone. You may use the git repo however you would like, but make sure to submit the following files to Gradescope before the deadline:
* index.html
* main.js
* timeline.js
* style.css
* README.md
* any other modified files

We will also evaluate code readability and structure (add comments, indent code, use functions, ...).

Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo.

---

# Visualizing the Cost of Natural Disasters

The goal of this assignment is to reproduce a visualization that was published in the New York Times. It shows the estimated cost of natural disasters in the U.S. between 1980 and 2017 with semicircles. This interactive visualization is not one of the typical chart types that you see frequently. It demonstrates the high expressivity of D3 and combines various D3 concepts that you have learned during the last few weeks.

The final result should look similar to the image below:

![Result](result.png?raw=true "Result")

We recommend that you break down the implementation into the following tasks. Please read the instructions carefully as we provide more details about the requirements your visualization must need to fulfill.

1. **Familiarize yourself with the given template** (`index.html`, `main.js`, `timeline.js`) and the dataset in the /data folder. 
	* The CSV data is loaded in the `main.js` file. We convert `year` and `cost` columns to numbers, and create a date objects based on the date string (`mid`).
	* A rough structure of the D3 visualization is provided in the `timeline.js` file.
	* We have defined some default parameters. The `width` of the SVG element must be **800px**. Feel free to change other configurations. For example, in our screenshot the `height` is 900px but it can be adjusted and depends if you want to create the legend in SVG or plain HTML.
	* As you can see in the image above, some of the semicircles are clipped if they are at the very beginning or end of the year. The *clipping* can be done using SVG masks. We have added the necessary code to `initVis()` in the `timeline.js` file. You just need to make sure to draw all semicircles within `vis.chart` and the paths will be clipped to the chart area. The x- and y-axis should be appended to `vis.chartArea`.

2. **Initialize scales and axes**

	* Show all years between 1980 and 2017 on the y-axis, and display horizontal grid lines (*hint: you can create grid lines by using `d3.axisLeft(vis.yScale).tickSize(-vis.width)`*).

	* Use `d3.axisTop()` with `d3.scaleTime()` to show the x-axis with month labels at the top.

	* The goal is to draw a semicircle for each natural disaster later. We added D3's arc generator to the template that makes it easy to generate the SVG path of the semicircles based on a given radius. The following code snippet is already in `initVis()`:
	
		```js
		vis.arcGenerator = d3.arc()
	        .outerRadius(d => vis.radiusScale(d))
	        .innerRadius(0)
	        .startAngle(-Math.PI / 2)
	        .endAngle(Math.PI / 2);
		```
	
	* You need to create the radius scale that is used in the arc generator: The radius should be between **4** and **140px** for the least and most costly disasters, respectively. Use a **square root scale** and not a linear scale to create an accurate visual representation. You can read more about why it's a mistake to linearly map a data value to a circle radius in this [blog post](https://bl.ocks.org/guilhermesimoes/e6356aa90a16163a6f917f53600a2b4a).


3. **Draw the semicircles**

	The visualization must be ready to accept new or filtered data. Thus, you must follow the enter-update-exit pattern (or the shortcut using the `join()` function) or otherwise we deduct a substantial number of points from your grade. Don’t remove all elements and redraw the chart from scratch every time the `renderVis()` function is called.
	
	You must draw the visualization using nested SVG groups (`<g></g>`). 
		
	* You can use `d3.groups(data, d => d.year)` to
	group all rows in the dataset and create a 2-dimensional array. This preprocessing step makes it easier to visualize the data. 
	* 1st level: Create a group for each year and set the position using SVG's `translate()` transformation.
	* 2nd level: Within each year group, create a group for each disaster and position it based on the *day of the year*.
	* 3rd level: Within each disaster, create a path element for the semicircle, and a text label for the largest disaster per year (see Task 5).
	
	You can get the SVG path for a semicircle using the arc generator: 
	
	```js
	.attr('d', d => vis.arcGenerator(d.cost))`
	```
	
4. **Style the semicircles**
	
	* Set the `fill-opacity` to `0.60`, `stroke` colour to `#333`, and `stroke-width` to `0.3`.
	
	* Set the colour based on the disaster `category` attribute. You can create an ordinal colour scale with D3 or you can add classes for the different categories and define the colours in CSS. You must use these colours for the 5 categories:

		| title                   | category            | hex code |
		|-------------------------|---------------------|----------|
		| Winter storms, freezing | winter-storm-freeze | #ccc     |
		| Drought and wildfire    | drought-wildfire    | #ffffd9  |
		| Flooding                | flooding            | #41b6c4  |
		| Tropical cyclones       | tropical-cyclone    | #081d58  |
		| Severe storms           | severe-storm        | #c7e9b4  |

5. **Add text annotations** 

	* *Required:* Add a text label with the `name` of the costliest disaster of each year. The labels should be positioned below each semicircle and centered (hint: `.attr('text-anchor', 'middle')`). Make sure that all labels are also part of your enter-update-exit workflow.
	* *Not required:* In our solution, we displayed the text label for Hurricane Harvey at the top and showed the estimated cost in billion dollars. We have also included the caption: *"Circles are sized proportionally to their cost in 2017 dollars."*. Those annotations are optional.

6. **Add a legend that also serves as an interactive filter**
	
	The legend must show the **titles** and **colours** of the five disaster categories (see table above). You can choose if you implement it in SVG or plain HTML.
	
	***Important:*** The legend serves as an interactive filter for the disaster categories. Every time the selection changes, you need to filter the data and call `renderVis()`. If you have implemented the enter-update-exit workflow correctly, you don't need to make any changes for the rendering.
	
	* By default, all categories are shown.
	* After the user clicks on a category in the legend, it becomes active and all other categories are hidden in the chart.
	* Users should be able to select multiple categories and a second click on an active category sets it inactive.
	* Indicate the filtering state visually. For example, in our solution, we show the text labels of inactive categories in *grey* and active categories in *black*.
	* The size of the semicircles should remain unchanged, independent which categories are visible.
	* Don't just change the visibility of semicircles with CSS classes. You need to update the data and execute `renderVis()` whenever the filter changes.

	![Interactive Filter](interactive_filter.gif?raw=true "Interactive Filter")

7. **Add tooltips**: Show an interactive tooltip when users hover over a semicircle. The tooltip needs to contain the disaster title and the estimated cost in billion dollars. 

	![Tooltip](tooltip.png?raw=true "Tooltip")

8. **Clean up**: Make sure to remove old code snippets that are not needed anymore. Add code comments and indent code consistently.

9. **Submit**: your solution to Gradescope.


**Requirements:**

* SVG details
    * The SVG chart must have an id of "chart" and have a width of 800px.
    * The SVG chart must be structured into nested SVG groups
    * The SVG chart must have reasonable margins and general spacing so as to be easily legible, not too cluttered, and not too spread out.
* Scales
    * All years between 1980 and 2017 are shown on the y-axis on the left of the left 
    * There are horizontal grid lines
    * All months of the year are shown on the x-axis on the top of the chart
* Marks
    * Each mark must have the class name "mark"
    * Must be semicircles
    * Must be clipped if at the beginning or end of the year
    * Semicircle radius must be between 4 and 140 pixels
    * Semicircle radius must use a square root scale 
    * Fill opacity must be 0.60
    * Stroke colour must be #333
    * Stroke width must be 0.3
    * The costliest disaster of each year must have a text annotation
    * Marks are coloured correctly according to their categories
* Tooltips
    * Every mark has a tooltip that displays on hover
    * The tooltip contains the disaster title
    * The tooltip contains the estimated cost in billion dollars
* Legend
    * All categories are shown with the correct colours
    * Clicking on a category toggles its status
    * All categories are shown when no categories are active
    * Active categories are shown in black
    * Inactive categories are shown in grey
    * Changes to which categories are active calls renderVis
    * Changes to which categories are active does not change the semicircle sizes
* Code structure and format
    * Your code must follow reasonable style standards. 
    * Don’t leave any old, unused code snippets.
    * Code must be well structured rather than copy/paste duplication or massive functions.
    * Code must be well commented (but not over commented).
    * Code must be consistently indented.
* Citations and explanations
    * Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo. You will submit this to Gradescope in addition to other code files.
