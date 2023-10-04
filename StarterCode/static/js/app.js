const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(function(data) {
    console.log(data);

    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    sortedsamples = samples.sort((a,b) => b.sample_values - a.sample_values)
    init()
});

function init() {
    let data = [{x: sortedsamples[0].sample_values.slice(0,10).reverse(),
             y: sortedsamples[0].otu_ids.slice(0,10).map(object => 'OTU ' + String(object)),
             text: sortedsamples[0].otu_labels.slice(0,10),
             name: 'Name',
             type: 'bar',
             orientation: 'h'
    }];
    let layout = {
        title: "Title",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
    Plotly.newPlot('bar',data,layout);

    d3.select('#sample-metadata').append('tbody').append('tr').text(metadata[0].id);
    d3.select('#selDataset').append('option').attr('value','940').text(940)
};



d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    let dropdownMenu = d3.select('#selDataset');

    let dataset = dropdownMenu.property('value');
};