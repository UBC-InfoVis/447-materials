class Barchart {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    // Configuration object with defaults
    // Important: depending on your vis and the type of interactivity you need
    // you might want to use getter and setter methods for individual attributes
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 1000,
      containerHeight: _config.containerHeight || 600,
      margin: _config.margin || {
        top: 70,
        right: 50,
        bottom: 100,
        left: 50
      }
    }
    this.data = _data;

    this.initVis();
  }

  /**
   * This function contains all the code that gets excecuted only once at the beginning.
   * (can be also part of the class constructor)
   * We initialize scales/axes and append static elements, such as axis titles.
   * If we want to implement a responsive visualization, we would move the size
   * specifications to the updateVis() function.
   */
  initVis() {
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    // You need to adjust the margin config depending on the types of axis tick labels
    // and the position of axis titles (margin convetion: https://bl.ocks.org/mbostock/3019563)
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales
    vis.xScale = d3.scaleBand()
      .range([0, vis.width])
      .paddingInner(0.2)

    vis.yScale = d3.scaleLinear()
      .range([vis.height, 0])

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
      .ticks(6)
      .tickSizeOuter(0);

    vis.yAxis = d3.axisLeft(vis.yScale)
      .tickSizeOuter(0);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
      .append('svg')
      .attr('width', vis.config.containerWidth)
      .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart
    // and position it according to the given margin config
    vis.chart = vis.svg.append('g')
      .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${vis.height})`);

    // Append and move a title for the x-axis. We don't have to move it to the bototm of the
    // chart since we append it to the x-axis group.
    vis.xAxisTitle = vis.xAxisG.append("text")
      .attr("y", 20)
      .attr("x", vis.width / 2)
      .attr("dy", "2.5em")
      .attr('fill', 'black')
      .attr('class', 'axis-label x')
      .style("text-anchor", "middle")
      .text("State");

    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
      .attr('class', 'axis y-axis');

    // Append y-axis title
    vis.yAxisTitle = vis.yAxisG.append("text")
      .attr("transform", "rotate(-90)") // when rotate -90, you rotate around the 0,0 point of the svg el
      .attr("y", -vis.config.margin.top + 20) // so you subtract the margin.top to push the label visually to the left
      .attr("x", -vis.height / 2) // and also move it vertically down even though it's the 'x' attribute
      .attr("dy", "1em")
      .attr('fill', 'black')
      .style("text-anchor", "middle")
      .text("Percent Drinking");
  }

  /**
   * This function contains all the code to prepare the data before we render it.
   * In some cases, you may not need this function but when you create more complex visualizations
   * you will probably want to organize your code in multiple functions.
   */
  updateVis() {
    let vis = this;

    // Specificy x- and y-accessor functions
    vis.xValue = d => d.state;
    vis.yValue = d => d.percent;

    // Set the scale input domains
    vis.xScale.domain(vis.data.map((d) => vis.xValue(d)))
    vis.yScale.domain([0, d3.max(vis.data, (d) => vis.yValue(d))])

    vis.renderVis();
  }

  /**
   * This function contains the D3 code for binding data to visual elements.
   * We call this function every time the data or configurations change
   * (i.e., user selects a different year)
   */
  renderVis() {
    // Fill out renderVis
    let vis = this;

    let bars = vis.chart.selectAll('.bar')
      .data(vis.data);

    let barEnter = bars.enter()
      .append('rect')
      .attr('class', 'bar');

    barEnter.merge(bars) // enter + update passing the selection to merge
      .attr('x', (d) => vis.xScale(vis.xValue(d)))
      .attr('width', vis.xScale.bandwidth())
      .transition().duration(500).delay((d, i) => i * 5)
      .attr('y', (d) => vis.height - vis.yScale(vis.yValue(d)))
      .attr('height', (d) => vis.yScale(vis.yValue(d)))

    bars.exit().remove();

    // Update the axes because the underlying scales might have changed
    vis.xAxisG.call(vis.xAxis);
    vis.yAxisG.call(vis.yAxis);
  }
}