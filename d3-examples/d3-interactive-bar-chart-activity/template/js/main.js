
/**
 * Load data from CSV file asynchronously and render chart
 */
d3.csv('data/all_drinking.csv').then(data => {

	// Generate filters from input elements on index.html
	const getFilters = () => {
		let s = {
			"sex": "female",
			"type": "any",
		};
		$('.btn-group .active input').each(function (d, i) {
			$(this).hasClass('sex') ? s.sex = $(this).attr('value') : s.type = $(this).attr('value')
		});

		return s;
	};

	// Actually filter the data
	const filterData = (data) => {
		let filters = getFilters();
		return data.filter((d) => d.sex == filters.sex &&
			d.type == filters.type);
	}

	// Do any tranformations of the data

	// Create a new bar chart instance and pass the filtered data to the bar chart class

	// Show chart by calling updateVis


	// Update the data passed to the chart whenever you interact with a button
	$('input').change(() => {
		barchart.data = filterData(data);
		barchart.updateVis();
	});
})
.catch(error => console.error(error));