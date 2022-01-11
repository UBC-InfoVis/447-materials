class Timeline {

  /**
   * Class constructor with initial configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      disasterCategories: _config.disasterCategories,
      containerWidth: 800,
      containerHeight: 900,
      tooltipPadding: 15,
      margin: {top: 120, right: 20, bottom: 20, left: 45},
      legendWidth: 170,
      legendHeight: 8,
      legendRadius: 5
    }
    this.data = _data;
    this.selectedCategories = [];
    this.initVis();
  }
  
  /**
   * We initialize the arc generator, scales, axes, and append static elements
   */
  initVis() {
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Todo: Initialize scales and axes
    // ...

    // Initialize arc generator that we use to create the SVG path for the half circles. 
    vis.arcGenerator = d3.arc()
        .outerRadius(d => vis.radiusScale(d))
        .innerRadius(0)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement).append('svg')
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart 
    // and position it according to the given margin config
    vis.chartArea = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Todo: Append axis groups
    // ...

    // Initialize clipping mask that covers the whole chart
    vis.chartArea.append('defs')
      .append('clipPath')
        .attr('id', 'chart-mask')
      .append('rect')
        .attr('width', vis.width)
        .attr('y', -vis.config.margin.top)
        .attr('height', vis.config.containerHeight);

    // Apply clipping mask to 'vis.chart' to clip semicircles at the very beginning and end of a year
    vis.chart = vis.chartArea.append('g')
        .attr('clip-path', 'url(#chart-mask)');

    // Optional: other static elements
    // ...
    
    vis.updateVis();
  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;

    // Todo

    vis.renderVis();
  }

  /**
   * Bind data to visual elements (enter-update-exit) and update axes
   */
  renderVis() {
    let vis = this;

    // Todo
  }

  renderLegend() {
    let vis = this;

    // Todo: Display the disaster category legend that also serves as an interactive filter.
    // You can add the legend also to `index.html` instead and have your event listener in `main.js`.
  }
}