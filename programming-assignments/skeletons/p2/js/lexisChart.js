class LexisChart {

  /**
   * Class constructor with initial configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: 1000,
      containerHeight: 380,
      margin: {
        top: 15,
        right: 15,
        bottom: 20,
        left: 25
      }
    }
    this.initVis();
  }

  /**
   * Create scales, axes, and append static elements
   */
  initVis() {
    let vis = this;

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
      .attr('width', vis.config.containerWidth)
      .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart
    // and position it according to the given margin config
    vis.chartArea = vis.svg.append('g')
      .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    vis.chart = vis.chartArea.append('g');

    // Helper function to create the arrows and styles for our various arrow heads
    vis.createMarkerEnds();



    // Todo: initialize scales, axes, static elements, etc.
  }


  updateVis() {
    let vis = this;

    // Todo: prepare data

    vis.renderVis();
  }


  renderVis() {

    // Todo: Bind data to visual elements (enter-update-exit or join)

  }

  // Create all of the different arrow heads. Styles: default, hover, highlight, highlight-selected
  // To switch between these styles you can switch between the CSS class. See link below for more info.
  // https://observablehq.com/@stvkas/interacting-with-marker-ends
  createMarkerEnds() {
    // Default arrow head
    // id: arrow-head
    vis.chart.append('defs').append('marker')
      .attr('id', 'arrow-head')
      .attr('markerUnits', 'strokeWidth')
      .attr('refX', '2')
      .attr('refY', '2')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L2,2 L 0,4')
      .attr('stroke', '#ddd')
      .attr('fill', 'none');

    // Hovered arrow head
    // id: arrow-head-hovered
    vis.chart.append('defs').append('marker')
      .attr('id', 'arrow-head-hovered')
      .attr('markerUnits', 'strokeWidth')
      .attr('refX', '2')
      .attr('refY', '2')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L2,2 L 0,4')
      .attr('stroke', '#888')
      .attr('fill', 'none');

    // Highlight arrow head
    // id: arrow-head-highlighted
    vis.chart.append('defs').append('marker')
      .attr('id', 'arrow-head-highlighted')
      .attr('markerUnits', 'strokeWidth')
      .attr('refX', '2')
      .attr('refY', '2')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L2,2 L 0,4')
      .attr('stroke', '#aeaeca')
      .attr('fill', 'none');

    // Highlighted-selected arrow head
    // id: arrow-head-highlighted-selected
    vis.chart.append('defs').append('marker')
      .attr('id', 'arrow-head-highlighted-selected')
      .attr('markerUnits', 'strokeWidth')
      .attr('refX', '2')
      .attr('refY', '2')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L2,2 L 0,4')
      .attr('stroke', '#e89f03')
      .attr('fill', 'none');
  }
}