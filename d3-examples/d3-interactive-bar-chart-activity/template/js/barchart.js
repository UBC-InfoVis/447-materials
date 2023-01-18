class Barchart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
        // Configuration object with defaults
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

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // Append group element that will contain our actual chart
        // and position it according to the given margin config
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // TODO: Add scales and titles/labels
    }

    /**
     * This function contains all the code to prepare the data before we render it.
     * In some cases, you may not need this function but when you create more complex visualizations
     * you will probably want to organize your code in multiple functions.
     */
    updateVis() {
        let vis = this;

        // TODO: Specificy x- and y-accessor functions
        vis.xValue;
        vis.yValue;

        // TODO: Set the scale input domains

        vis.renderVis();
    }

    /**
     * This function contains the D3 code for binding data to visual elements.
     * We call this function every time the data or configurations change
     * (i.e., user selects a different year)
     */
    renderVis() {
        // TODO: Fill out renderVis
    }

}