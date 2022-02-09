# Programming Assignment 2

*Due on Mar 4 2022 at 6pm.*

*Remember to submit all modified files to Gradescope before the due date*

This programming assignment assumes that you have fulfilled all course prerequisites and followed along with the D3 tutorials.

### Template and Submission

We will use **git** repositories for all programming assignments and project milestones. You should already be well acquainted with the process and all necessary git commands from the previous programming assignment.

We created a git repository in your github student account ([https://github.students.cs.ubc.ca/](https://github.students.cs.ubc.ca/)) that contains a template that should help you get started. The dataset is included in the /data folder. You will need to modify the .html, .js, and .css files as described below. Don't add new files.

You must work alone. You may use the git repo however you would like, but make sure to submit the following files to Gradescope before the deadline:
* index.html
* main.js
* barChart.js
* lexisChart.js
* scatterplot.js
* style.css
* README.md
* any other modified files

We will also evaluate code readability and structure (add comments, indent code, use functions, ...).

Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo.

---

# Visualizing Political Leaders

The goal of this assignment is to implement a D3 visualization with three linked views and a global filter option:

* **Lexis chart** showing the age of political leaders and their time in office.
* **Bar chart** showing the number of female and male politicians.
* **Scatter plot** showing the age of politicians and their country's GDP per capita when they got elected.

The final result should look similar to the image below but you can make some style changes and arrange the views differently.

**We have a recorded a [video that shows the required interactions](https://github.com/UBC-InfoVis/436V-materials/blob/main/programming-assignments/skeletons/p2/p2-demo.mp4).**

![Result](result.png?raw=true "Result")

The most important part of this assignment is to implement linked interactions. Creating a bar chart or scatter plot should not pose a challenge anymore. You can also reuse code from tutorials, case studies, and previous assignments. 

We recommend that you break down the implementation into the following tasks. Please read the instructions carefully as we provide more details about the requirements your visualization must need to fulfill.

1. **Familiarize yourself with the given template** (`index.html`, `main.js`, `lexisChart.js`, `barChart.js`, `scatterPlot.js`) **and the dataset** (`leaderlist.csv`). 
	* The CSV data is loaded in the `main.js` file and we converted string columns to numbers.
	* You will need the following columns:
		
		![Data desc](data_desc.png?raw=true "Data desc")
		
	* Rough class structures of the three views are provided. You don't strictly need to use those templates and you can change all dimensions but you need to make sure that your code is well-structured.
	*  All three charts need to be created using D3's enter-update-exit pattern or using the `join()` function. Don't remove and redraw all elements when a chart gets updated.

2. **Global filter**

	We have added a select box to the `index.html` file that allows users to choose a group of countries. Whenever the selection changes, you need to filter the loaded dataset and update all views. One option is always selected (default option = oecd).

3. **Lexis chart**

	* `age` is shown on the y-axis and `year` on the x-axis. You can set the input domains of the two linear linear scales manually, so that the axes remain constant although filters or selections may change (e.g., age: [25,95] and year: [1950,2021]).
	* The lexis chart is similar to a scatter plot but instead of point marks, you need to draw lines/arrows. The coordinates for the lines are: x1=`start_year`, x2=`end_year`, y1=`start_age`, and y2=`end_age`.
	* The D3 code for creating arrowheads (SVG markers) is included in `lexisChart.js`. The SVG markers are initialized with an id (e.g., `#arrow-head`) and can then be applied to SVG lines using D3 (i.e., `.attr('marker-end', 'url(#arrow-head)')`)
 or CSS (i.e., `marker-end: url(#arrow-head)`). To learn more about how the marker ends work, see [this short explainer](https://observablehq.com/@stvkas/interacting-with-marker-ends) made by Steve Kasica.
 	* Arrows can have 3 different styles:
 		1. ***Default***
 		2. ***Highlighted***: Some politicians are highlighted in the visualization and their name is displayed next to the arrow. For example, adjust the colour and the stroke width. Whether an arrow is highlighted is determined by the data attribute `label` (1=highlight). *Hint: you can use transform to rotate SVG text labels a few degrees:*
	 		
	 		```js
	 		.attr('transform', d => `translate(X-POSITION,Y-POSITION) rotate(-20)`);
	 		```
	 	3. ***Selected***: Users should be able to click on a single point in the scatter plot. The selected politician will get highlighted and their name is shown in the lexis chart, independent of the `label` attribute.
	* Show tooltips on `mouseover` with the following information: name, country, start and end year, age when they took office, total duration, and GDP per capita (if available).

		![Tooltip](tooltip.png?raw=true "Tooltip")
	
4. **Bar chart**

	* Count and visualize the number of female and male politicians. *Hint: You may want to use `d3.rollups()`*.

5. **Scatter plot**

	* Filter the dataset to show only points where the GDP is known (i.e., `pcgdp !== null`).
	* Set the radius of the point marks to 5px and and use a fill-opacity < 1.
	* Show the same tooltips as in the lexis chart when users hover over a point.

6. **Connect views**

	1. ***Bar chart → lexis chart***
		
		Use the bar chart as an interactive filter for the lexis chart. For example, when users click on the `female` option, only female politicians are shown in the lexis chart. Another click on an active option resets the filter.
		
	2. ***Bar chart → scatter plot***
	
		Points in the scatter plot should not be hidden when a gender is selected. Instead, you need to adjust the *fill opacity*. For instance, set the opacity to `0.7` for active and `0.15` for inactive points. Tooltips should only work on active points in the scatter plot.
		 
		 ![Active-Inactive](active_inactive.png?raw=true "Active-Inactive")
		
	3. ***Scatter plot → lexis chart***
	
		When users click on a point in the scatter plot, the fill colour changes and the politician is highlighted in the lexis chart. A second click resets everything.
		
7. Add axis/chart **titles**.

8. **Clean up**: Make sure to remove old code snippets that are not needed anymore. Add code comments and indent code consistently.

9. **Submit** your solution to Gradescope.

**Requirements:**

* SVG details
    * The SVG chart must have reasonable margins and general spacing so as to be easily legible, not too cluttered, and not too spread out
* Lexis chart
    * The SVG chart must have an id of "lexis-chart"
    * Age is on the y-axis and year is on the x-axis
    * Axes are clean, titled, and formatted well
    * Each mark must have the class name "arrow"
    * Each mark is in the shape of an arrow
    * Each arrow starts and ends at the correct places
    * Some arrows are highlighted and have rotated labels
    * Selecting a point in the scatter plot highlights and adds a label for the selected politician
    * Changing the dropdown filter or gender filter clears selected arrows
    * Arrows become more prominent when hovered over
    * Arrows have tooltips that show name, country, start and end year, age when they took office, total duration, and GDP per capita (if available)
* Bar chart
    * The SVG chart must have an id of "bar-chart"
    * Count is on the y-axis and gender is on the x-axis
    * Axes are clean, titled, and formatted well
    * Horizontal gridlines are visible
    * Each mark must have the class name "bar"
    * The bars have the correct heights for each filter in the dropdown
    * Hovering over a bar outlines it
    * Clicking a bar darkens it
    * Clicking on an unselected bar filters the data to that gender and deselects the other gender if it is selected
    * Clicking on a selected bar removes the filter on that gender
* Scatter plot
    * The SVG chart must have an id of "scatter-plot"
    * Age is on the y-axis and GDP per capita is on the x-axis
    * Axes are clean, titled, and formatted well
    * Horizontal and vertical gridlines are visible
    * Each mark must have the class name "point"
    * The points are at the correct locations
    * Points that are filtered out by the dropdown have lowered opacity
    * Changing the dropdown filter or bar chart gender filter clears selected circles
    * Hovering over an included point darkens it and adds an outline
    * Hovering over an unincluded point (one that is greyed out via filtering) does not do anything
    * Clicking on an unselected point highlights it and deselects any previously selected point
    * Clicking on a selected point unhighlights it
    * Clicking on an unincluded point does nothing
    * Unfiltered points have tooltips that show name, country, start and end year, age when they took office, total duration, and GDP per capita (if available, otherwise show nothing or describe it as missing rather than leaving it as null or 0)
* Code structure and format
    * Your code must follow reasonable style standards. 
    * Don’t leave any old, unused code snippets.
    * Code must be well structured rather than copy/paste duplication or massive functions.
    * Code must be well commented (but not over commented).
    * Code must be consistently indented.
* Citations and explanations
    * Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo. You will submit this to Gradescope in addition to other code files.
* Other
    * Admin penalties up to 20% for not following instructions