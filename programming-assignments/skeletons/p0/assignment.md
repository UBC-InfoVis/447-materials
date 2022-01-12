# Programming Assignment 0

*Out: Thu Jan 13 2022. Due: Fri Jan 28 2022, 6pm.*

*Remember to submit a zip file of your repo to Gradescope before the due date*

This programming assignment assumes that you have fulfilled all course prerequisites and followed along with the D3 tutorials.

### Template and Submission

We will use **git** repositories for all programming assignments and project milestones. You should already be well acquainted with the process and all necessary git commands from previous courses (see [Reid Holmes' CPSC 310 git tutorial](https://github.com/ubccpsc/310/blob/2019jan/resources/git.md) as a refresher).

We created a git repository in your github student account ([https://github.students.cs.ubc.ca/](https://github.students.cs.ubc.ca/)) that contains a basic template that should help you get started. A dataset is included in the /data folder. You will need to modify the .html, .js, and .css files as described below. Don't add new files.

Submit the programming assignment by zipping the final version of your code and submitting it to Gradescope before the deadline. Work alone.

---

### Scatter Plot with Continuous X and Categorical Y Variables

The goal of this assignment is to get familiar with the infrastructure (local web server, git, ...) and to create a basic scatter plot in D3. Note that *P1* and *P2* will be signifiantly more complex and thus have a higher weight on your overall grade. 

The final result of the *P0* assignment should look similar to the image below:

![Result](result.png?raw=true "Result")

**Requirements:**

* SVG details
    * The SVG chart must have a width of 500px and a height of 250px. 
    * The SVG chart must have reasonable margins and general spacing so as to be easily legible, not too cluttered, and not too spread out.
* Scales
    * Use one categorical scale and one linear scale. 
    * The y-axis must denote the trial number and the x-axis must denote accuracy. 
    * Show grid lines for the x-axis but do not include any other tick marks or grid lines. 
    * The y-axis labels must include “Trial” before the numbers, i.e. “Trial 1”, “Trial 2”, etc.
    * The y-axis must be shown in ascending order.
* Point marks
    * The point marks must be circles of radius 8px and they must use fill opacity to indicate overlapping marks. 
    * You may choose the fill colour.
* Summary statistics
    * To the right of each trial there should be a text label with the average accuracy of that trial, rounded to two decimal places. 
    * Include an axis title that says “Accuracy (mean)” above these averages. 
    * Hint: You can use d3.rollups to group data points and compute summary statistics (Example: d3.rollups(athletes, v => d3.sum(v, d => d.earnings), d => d.sport) computes the total earnings in each sports discipline based on a given athletes dataset).
* Robustness
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
    * Cite any external resources and explain exactly what modifications you have made in your README documentation. We created an empty `README.md` file in the root directory of the repo.

