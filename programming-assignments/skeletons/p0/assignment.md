# Programming Assignment 0

*Submit the entire __p0__ project as a zip file to Gradescope before the due date. DO NOT upload any other files. Failure to follow instructions will result in an administrative overhead penalty of up to 20%*

Before starting this programming assignment, we very highly recommend completing [D3 Tutorial 1 (Intro to D3)](../../../tutorials/1_D3_Tutorial_Intro/) and [D3 Tutorial 2 (Making a chart)]((../../../tutorials/1_D3_Tutorial_Intro/)). Also, if there are any aspects of web development that you're hazy about, then start with the refresher tutorial on Web Development If you are having trouble with your assignment, referencing the tutorials first is often the best place to start!

### Template and Submission

We will use **Gradescope** for all programming assignments and project milestones. You should already be well acquainted with the process from previous courses, but ask course staff if you need a refresher.

This repo contains a basic template that should help you get started. You can download .zip of the repo: ([p0.zip](https://www.students.cs.ubc.ca/~cs-447/25Jan/p0.zip)).
A dataset is included in the `/data` folder. You will need to modify the `.html`, `.js`, and `.css` files as described below.

Don't add new files, don't leave out files, and don't change the names of existing files. Any changes will result in an admin overhead penalty of up to 20%.

Submit the programming assignment by zipping **the whole p0 folder** and submitting it to Gradescope before the deadline. Work alone.

---

### Scatter Plot with Continuous X and Categorical Y Variables

The goal of this assignment is to get familiar with the infrastructure (local web server, gradescope, git, ...) and to create a basic scatter plot in D3. Note that *P1* and *P2* will be significantly more complex and thus have a higher weight on your overall grade.

The final result of the *P0* assignment should look similar to the image below:

![Result](result.png?raw=true "Result")

### Suggested Strategy

1. **Familiarize yourself with the given template** (`index.html`, `main.js`, `scatterplot.js`) and the dataset in the `/data` folder.
	* The CSV data is loaded in the `main.js` file. Make any preprocessing steps required before moving to the rendering code.
  	* Remember to meaningfully organize your code! Typically this means separating the `init` and `render` processes semantically in your D3 code.
  	* Build up your visualization incrementally! It will be easier to debug each piece individually as you build up the components of the visualization.

2. **Initialize scales and axes**
    * You may only initilize and use one categorical scale and one linear scale. Generally, you should not create more scales than you need for a given solution. Try to reuse these for different functionality and across marks.
    * Reference [D3 Tutorial 2 (Making a chart)]((../../../tutorials/1_D3_Tutorial_Intro/)) for more information on scales and axes.

3. **Draw the points**
    * Use D3 to generate and position the point marks.
    * The point marks must have the class name "point".
    * Reference [D3 Tutorial 2 (Making a chart)]((../../../tutorials/1_D3_Tutorial_Intro/)) on how to position marks according to your scales.
    * Hint: You can debug the points by inspecting their element. A common error is that points are not positioned correctly, causing them to be drawn on top of each other. You can debug situations like these by inspecting the DOM and seeing if things are drawn on top of each other.

4. **Generate and append the summary statistics**
   * Remember that text can be another type of data-driven mark. The same data-driven approach to drawing the point marks can also be applied to the summary statistics.
   * Hint: You can use `d3.rollups` to group data points and compute summary statistics (Example: d3.rollups(athletes, v => d3.sum(v, d => d.earnings), d => d.sport) computes the total earnings in each sports discipline based on a given athletes dataset).
   * Hint: You can use the same scale for multiple purposes! Remember that scales are about mapping from data to pixel space; if that mapping doesn’t change then you don't need another one.

5. **Append the labels**
   * Labels that are generated once can be added to your visualization with D3 and do not need to be bound to data, although these too can be data-driven. You can manually manipulate and position these labels into their approximate correct location.

6. **Test your solution**
   * Test your solution by creating your own test input datasets. Remember to think of the potential edge cases in the input dataset!
   * We recommend first extending the base dataset, then altering and adding your own data points.
   * Your solution should be fleixble enough to accomodate changes in the dataset!

**Requirements:**

* SVG details
    * The SVG chart must have an id of "vis"
    * The SVG chart must have a width of 500px and a height of 250px.
    * The SVG chart must have reasonable margins and general spacing so as to be easily legible, not too cluttered, and not too spread out.
* Scales/Axes
    * You may only initialize and use one categorial scale and one linear scale.
    * The y-axis must denote the trial number and the x-axis must denote accuracy.
    * Show grid lines for the x-axis but do not include any other tick marks or grid lines.
    * The y-axis labels must include “Trial” before the numbers, i.e. “Trial 1”, “Trial 2”, etc.
    * The y-axis must be shown in ascending order.
* Point marks
    * The point marks must have class name "point"
    * The point marks must be circles of radius 8px and they must use fill opacity to indicate overlapping marks.
    * The point marks in each row must be vertically aligned with their respective trial and accuracy labels.
    * You may choose the fill colour.
* Summary statistics
    * To the right of each trial, there should be a text label annotation with the average accuracy of that trial, rounded to two decimal places.
    * The summary statistics in each row must be vertically aligned with their respective trial labels and point marks.
    * You **may not** use the `d3.axisRight` function to generate the summary statistics; you must generate and manipulate the summary labels yourself.
*  Labels
    * Include a chart title of "Trial/Accuracy Scatterplot" above the chart
    * Include a horizontal axis title of "Accuracy" below the x-axis.
    * Include an annotation on the upper right that says “Mean Accuracy Per Trial”.
*  Robustness
    * The visualization should work for different datasets in addition to the single test dataset that we provide, including but not limited to varying numbers of trials and varying trial average accuracies.
    * You should not assume that accuracies will be within the range [0, 1].
* Code structure and format
    * The scatterplot class provided in the template must not be removed.
    * Your code must follow reasonable style standards.
    * Don’t leave any old, unused code snippets.
    * Code must be well structured rather than copy/paste duplication or massive functions.
    * Code must be well commented (but not over commented).
    * Code must be consistently indented.
* Citations and explanations
    * Cite any external resources and explain how you used them or altered them for your assignment in your README documentation. We created an empty `README.md` file in the root directory of the repo. You will submit this to Gradescope in addition to other code files.
* Administrative / General / Hints
    * In general, when we leave something to you to decide, you should be consistent with your decisions. Document your choices in your README file.
    * Edit your README file. Even if you didn’t use any external resources, you should still modify README.md to say that and remove the TODO.
    * Make sure to double-check that nothing overlaps anything else on screen.
    * Please read the specification carefully. If we tell you exactly what class name or id to give some elements, you must do that. 
    * Please remove excess files including console.logs before submitting programming assignments
    * Admin overhead penalties up to 20% for not following instructions
