# Programming Assignment 0

*Due on Jan 27, 11:59pm.*

*Remember to submit your README.md file to Canvas before the due date*

This programming assignment assumes that you have fulfilled all course prerequisites and followed along with the D3 tutorials.

### Template and Submission

We will use **git** repositories for all programming assignments and project milestones. You should already be well acquainted with the process and all necessary git commands from previous courses (see [Reid Holmes' CPSC 310 git tutorial](https://github.com/ubccpsc/310/blob/2019jan/resources/git.md) as a refresher).

We created a git repository in your github student account ([https://github.students.cs.ubc.ca/](https://github.students.cs.ubc.ca/)) that contains a basic template that should help you get started. The dataset is included in the /data folder. You will need to modify the .html, .js, and .css files as described below. Don't add new files.

Submit the programming assignment by updating the given repository (`git push`) and by submitting your README file to Canvas before the deadline. You can commit/push changes as often as you want before the deadline. Work alone.

We will also evaluate code readability and structure (add comments, indent code, use functions, ...).

Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo.

---

### Scatter Plot with Continuous X and Categorical Y Variables

The goal of this assignment is to get familiar with the infrastructure (local web server, git, ...) and to create a basic scatter plot in D3. Note that *P1* and *P2* will be signifiantly more complex and thus have a higher weight on your overall grade. 

The final result of the *P0* assignment should look similar to the image below:

![Result](result.png?raw=true "Result")

**Requirements:**

* Overall
	* The width of the SVG chart is 500px and the height is 250px
	* The visualization is not interactive but you need to make sure that it can handle different datasets. It must be possible to change `experiment_data.csv` in `main.js` and load different trial data without making any other changes. Don't position elements manually except the axis title (*Accuracy x̄*).
	* We recommend that you create a *scatterplot class* to structure your code (i.e., reusable visualization components described in Tutorial 1) but it is not required.
	* Sort the data: The trials must be shown in ascending order.
* Scales and axes
	* Use a categorical and a linear scale
	* The y-axis denotes the trial number and the x-axis denotes accuracy
	* Show x-axis grid lines (*Hint: `.tickSize(-height)`*) but remove all other tick marks or grid lines
	* Add a "Trial" prefix to the y-axis tick labels (i.e., "Trial 1, Trial 2, ..." instead of "1, 2, ...")
* Point marks
	* The radius of all circles is 8px
	* You can choose a fill color
	* Use fill opacity to indicate overlapping marks
* Axis title
	* Add a text label: "Accuracy (x̄)" 
* Aggregated statistics
	* Show a text label with the average accuracy for each trial on the right side of the chart. Round to two decimal places.
	* *Hint:* You can use [d3.rollups](https://observablehq.com/@d3/d3-group#rollups) to group data points and compute summary statistics (Example: `d3.rollups(athletes, v => d3.sum(v, d => d.earnings), d => d.sport)` computes the total earnings in each sports discipline based on a given athletes dataset)
	* The labels should be automatically updated when we load different data


*Make sure to remove old code snippets that are not needed anymore. Add code comments and indent code consistently.*
