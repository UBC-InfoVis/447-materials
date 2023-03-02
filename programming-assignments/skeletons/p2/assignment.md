# Programming Assignment 2

*Out on Tue, Feb. 14, 2023. Due on Fri, Mar. 10, 2023, at 6pm.*

*Submit the entire __p2__ project as a zip file to Gradescope before the due date. Include all modified files. Failure to follow instructions will result in an administrative penalty of up to 20%*

This programming assignment assumes that you have fulfilled all course prerequisites and followed along with the D3 tutorials.

### Template and Submission

We will use **gradescope** for all programming assignments and project milestones. You should already be well acquainted with the process from previous courses, but ask course staff if you need a refresher.

This repo contains a basic template that should help you get started. You can download .zip of the repo: ([p2.zip](https://www.students.cs.ubc.ca/~cs-447/23Jan/p2.zip)).
A dataset is included in the `/data` folder. You will need to modify the `.html`, `.js`, and `.css` files as described below.

Don't add new files, don't leave out files, and don't change the names of existing files. Any changes will result in an admin overhead penalty of up to 20%.

We will also evaluate code readability and structure (add comments, indent code, use functions, ...).

Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo.

Submit the programming assignment by zipping ALL the above files, or selecting the whole `p2` folder and submitting it to Gradescope before the deadline.

Work alone.

---

# Visualizing Political Leaders

The goal of this assignment is to implement a D3 visualization with three linked views and a global filter option:

* **Lexis chart** showing the age of political leaders and their time in office.
* **Bar chart** showing the number of female and male politicians.
* **Scatter plot** showing the age of politicians and their country's GDP per capita when they got elected.

The final result should look similar to the image below but you can make some style changes and arrange the views differently.

**We have a recorded a [video that shows the required interactions](https://github.com/UBC-InfoVis/436V-materials/blob/23Jan/programming-assignments/skeletons/p2/p2-demo.mp4).**

![Result](result.png?raw=true "Result")

The most important part of this assignment is to implement linked interactions. Creating a bar chart or scatter plot should not pose a challenge anymore. You can also reuse code from tutorials, case studies, and previous assignments. We highly recommend you to use the `join` function to handle your data-join, as there is no need for nested groups in this assignment.

We recommend that you break down the implementation into the following tasks. Please read the instructions carefully as we provide more details about the requirements your visualization must need to fulfill.

1. **Familiarize yourself with the given template** (`index.html`, `main.js`, `lexisChart.js`, `barChart.js`, `scatterPlot.js`) **and the dataset** (`leaderlist.csv`).
	* The CSV data is loaded in the `main.js` file and we converted string columns to numbers.
	* You will need the following columns:

		![Data desc](data_desc.png?raw=true "Data desc")

	* Rough class structures of the three views are provided. You don't strictly need to use those templates and you can change all dimensions but you need to make sure that your code is well-structured.
	*  All three charts need to be created using D3's enter-update-exit pattern or using the `join()` function. Don't remove and redraw all elements when a chart gets updated.

2. **Global filter**

	* We have added a select box to the `index.html` file that allows users to choose a group of countries. Whenever the selection changes, you need to filter the loaded dataset and update all views.
	* One option is always selected (default option = oecd).
	* In addition to this select box, filter the global data where `duration > 0`.
	* Changing the dropdown filter will clear all selected elements including: selected gender, selected arrows, selected points
    * Changing the dropdown filter removes (rather than set opacity = 0) all points or arrows that are filtered out
    * Changing the dropdown filter updates the counts of items in the bar chart

3. **Lexis chart**

	* `age` is shown on the y-axis and `year` on the x-axis. You can set the input domains of the two linear linear scales to be static, so that the axes remain constant although filters or selections may change (e.g., age: [25,95] and year: [1950,2021]). There will be arrows outside of these bounds, and they should be masked with a chart-mask, similar to P1.
	* Include a label for `Age` for the y-axis in the top-left
	* The lexis chart is similar to a scatter plot but instead of point marks, you need to draw lines/arrows. The coordinates for the lines are: x1=`start_year`, x2=`end_year`, y1=`start_age`, and y2=`end_age`.
    * When arrows are selected, they should change their styles to be highlighted, and the corresponding label should appear
	* Multiple arrows may be selected
	* The D3 code for creating arrowheads (SVG markers) is included in `lexisChart.js`. The SVG markers are initialized with an id (e.g., `#arrow-head`) and can then be applied to SVG lines using D3 (i.e., `.attr('marker-end', 'url(#arrow-head)')`) or CSS (i.e., `marker-end: url(#arrow-head)`). To learn more about how the marker ends work, see [this short explainer](https://observablehq.com/@stvkas/interacting-with-marker-ends) made by Steve Kasica. You may create several of these markers to swap between.
	* Arrows can have 3 different styles:
 		1. ***Default***
 		2. ***Highlighted***: Some politicians are highlighted in the visualization and their name is displayed next to the arrow. For example, adjust the colour and the stroke width. Whether an arrow is highlighted is determined by the data attribute `label` (`1=highlight`). *Hint: you can use transform to rotate SVG text labels a few degrees:*

	 		```js
	 		.attr('transform', d => `translate(X-POSITION,Y-POSITION) rotate(-20)`);
	 		```
	 	3. ***Selected***: Users should be able to click on a single point in the scatter plot. The selected politician will get highlighted and their name is shown in the lexis chart, independent of the `label` attribute.
    * Arrows might have the same `start_year` and `end_year`, in which case they will be rendered as an arrowhead with no line
   * Show tooltips on `mouseover` with the following information: name, country, start and end year, age when they took office, total duration, and GDP per capita (if available). All arrows should have a tooltip on `mouseover`.

		![Tooltip](tooltip.png?raw=true "Tooltip")

4. **Bar chart**

	* Count and visualize the number of female and male politicians. *Hint: You may want to use `d3.rollups()`*.
	* Generally, there will be only female/male politicians, but do not make the assumption that there will be.
	* These counts will update as the global filter changes
	* When a bar is selected, it should be darkened
    * Include a label for `Gender` for the y-axis in the top-left

5. **Scatter plot**

	* Filter the dataset to show only points where the GDP is known (i.e., `pcgdp !== null`).
	* Set the radius of the point marks to 5px and and use a fill-opacity < 1.
	* Show the same tooltips as in the lexis chart when users hover over a point.
	* Position the points using `start_age`
	* You may use a static domain for the y-axis, but choose one that does not clip out any points (e.g. `[25-95]`)
	* Use a dynamic domain for the x-axis
	* Selecting a point on the scatter plot causes it to be highlighted
	* Multiple dots may be selected
	* Include a labels for both axes: `Age` for the y-axis in the top-left and `GDP per Capita (US$)` for the x-axis in the bottom-right

6. **Connect views**

	1. ***Bar chart → lexis chart***

		- Use the bar chart as an interactive filter for the lexis chart. For example, when users click on the `female` option, only female politicians are shown in the lexis chart. Another click on an active option resets the filter.
		- If arrows are currently highlighted, arrows are only deselected if the bar chart filters them out. For example, if Trudeau is selected in the lexis chart, and the `male` bar is selected, the arrow representing Trudeau is NOT deselected.
         - Selection: If a gender filter is active and deactivated when arrows are selected their selection should be maintained

	2. ***Bar chart → scatter plot***

		- Points in the scatter plot should not be hidden when a gender is selected. Instead, you need to adjust the *fill opacity*. For instance, set the opacity to `0.7` for active and `0.15` for inactive points.
        - If points in the scatter plot are highlighted, selecting a gender in the bar chart clears (unselects) highlighted points that are filtered out. (See bullet 2 of bar chart -> lexis chart)
        - Remove interaction of filtered out points. Hovering over filtered out points no longer darkens or adds an outline, and you can no longer select them to be highlighted. Tooltips should only work on active points in the scatter plot.
         - Selection: If a gender filter is active and deactivated when arrows are selected their selection should be maintained

		 ![Active-Inactive](active_inactive.png?raw=true "Active-Inactive")

	3. ***Scatter plot → lexis chart***

		- When users click on a point in the scatter plot, the fill colour changes and the politician is highlighted in the lexis chart.
		- When users click on multiple points, they should all be highlighted.
		- Clicking outside any point (but still on the scatter plot) resets the selection entirely.
		- Scatter plot and lexis chart share the same selection: if a new arrow is selected in the lexis chart, the corresponding point in the scatterplot should be selected
		- Similarly, if you click on a selected arrow in the lexis chart (to deselect it), the corresponding point in the scatterplot should be deselected

   4. ***Lexis chart → scatter plot***
        - When clicking on an arrow in the lexis chart, the corresponding point should also highlight in the scatter plot. Because we are filtering where the GDP is known, it is possible that clicking on some arrows will not have corresponding dots in the scatter plot.
        - Clicking on the lexis chart does not reset any selection

7. Add axis/chart **titles**.

8. **Clean up**: Make sure to remove old code snippets that are not needed anymore. Add code comments and indent code consistently.

9.  **Submit** your solution to Gradescope.

**Requirements:**

* SVG details
    * The SVG chart must have reasonable margins and general spacing so as to be easily legible, not too cluttered, and not too spread out
* Global dropdown filter
    * You must use the supplied dropdown filter as the control to filter your chart
    * Changing the dropdown filter will clear all selected elements including: selected gender, selected arrows, selected points
    * Changing the dropdown filter removes (rather than set opacity = 0) all points or arrows that are filtered out
    * Changing the dropdown filter updates the counts of items in the bar chart
* Lexis chart
    * The SVG chart must have an id of "lexis-chart"
    * Age is on the y-axis and year is on the x-axis
    * Y-axis has the label "Age" in the top left
    * Axes are clean, titled, and formatted well
    * All gridlines (horizontal and vertical) are removed
    * Each mark must have the class name "arrow"
    * Each mark is in the shape of an arrow
    * Each arrow starts and ends at the correct places
    * Some arrows are highlighted and have rotated labels
    * Hover: Arrows that are not highlighted or selected become more prominent when hovered over
    * Hover: All arrows have tooltips that show name, country, start and end year, age when they took office, total duration, and GDP per capita (if available)
    * Selection: selecting any arrow in the lexis chart highlights it and adds a label for the selected politician
* Bar chart
    * The SVG chart must have an id of "bar-chart"
    * Count is on the y-axis and gender is on the x-axis
    * Y-axis has the label "Gender" in the top left
    * Axes are clean, titled, and formatted well
    * Horizontal gridlines are visible
    * Vertical gridlines are removed
    * Each mark must have the class name "bar"
    * The bars have the correct heights for each filter in the global dropdown
    * Hover: Mouseover a bar outlines it
    * Selection: clicking a bar darkens it
    * Selection: clicking on an unselected bar filters the data to that gender and deselects the other gender if it is selected
    * Selection: clicking on a selected bar removes the filter on that gender (i.e. resets to "all")
* Scatter plot
    * The SVG chart must have an id of "scatter-plot"
    * Age is on the y-axis and GDP per capita is on the x-axis
    * Y-axis has the label "Age" in the top left
    * X-axis has the label "GDP per Capita (US$)" in the bottom right
    * Axes are clean, titled, and formatted well
    * Horizontal and vertical gridlines are visible
    * Each mark must have the class name "point"
    * The points are at the correct locations
    * No points are clipped from the chart
    * Hover: Mouseover an included point (included by both dropdown and gender filter) darkens it and adds an outline
    * Hover: Mouseover a selected point adds an outline
    * Hover: Mouseover on an unincluded point (one that is greyed out via filtering) does not do anything
    * Hover: Mouseover any included points have tooltips that show name, country, start and end year, age when they took office, total duration, and GDP per capita (if available, otherwise show nothing or describe it as missing rather than leaving it as null or 0)
    * Selection: clicking on an unselected point highlights it
    * Selection: clicking on a selected point unhighlights it
    * Selection: clicking on an unincluded point does nothing
    * Selection: clicking anywhere on the scatter plot clears the existing selected points
* Connect Views
  * Lexis chart → scatter plot
    * Selection: selecting an arrow in the lexis chart highlights the corresponding dot in the scatter plot if it exists
    * Selection: similarly, selecting a highlighted corresponding dot in scatter plot deselects the arrow in the lexis chart
    * Selection: multiple arrows can be selected for highlight
    * Selection: clicking outside of an arrow does nothing
  * Scatter plot → lexis chart
    * Selection: selecting a point in the scatter plot highlights the corresponding arrow and the arrow's label
    * Selection: multiple points can be selected for highlight
    * Selection: clicking outside of a point but still on the scatter plot should clear the selection
  * Bar chart → lexis chart
    * Selection: clicking on a bar removes lexis arrows (rather than changing the opacity) that are filtered out
    * Selection: clicking on a bar when lexis arrows are selected only clears the selection if the filter removes it from the included group
    * Selection: clicking on a bar to remove the gender filter when arrows are selected maintains their selection
  * Bar chart → scatter plot
    * Selection: clicking on a bar grays out (changes the opacity) points that are filtered out
    * Selection: clicking on a bar when points are selected only clears the selection if the filter removes it from the included group
    * Selection: clicking on a bar to remove the gender filter when points are selected maintains their selection
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
