const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Gather all data and store as variables; initialize the page
d3.json(url).then(function(data){
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    sortedsamples = samples.sort((a,b) => b.sample_values - a.sample_values)
    init()
});

function init() {
    // Initialize the bar graph
    let barData0 = [{x: sortedsamples[0].sample_values.slice(0,10).reverse(),
             y: sortedsamples[0].otu_ids.slice(0,10).map(object => 'OTU ' + String(object)).reverse(),
             text: sortedsamples[0].otu_labels.slice(0,10).reverse(),
             type: 'bar',
             orientation: 'h'
    }];
    Plotly.newPlot('bar',barData0);

    // Initialize the bubble graph
    let bubbleData0 = [{x:sortedsamples[0].otu_ids,
                        y:sortedsamples[0].sample_values,
                        text:sortedsamples[0].otu_labels,
                        mode:'markers',
                        marker:{
                          color:sortedsamples[0].otu_ids,
                          size:sortedsamples[0].sample_values
                        }
    }];
    Plotly.newPlot('bubble',bubbleData0,{xaxis: {title:'OTU ID'}});

    // Initialize the metadata table
    demoinfo = d3.select('#sample-metadata').append('tbody');
    for (item in metadata[0]){
      demoinfo.append('tr');
      demoinfo.append('td').text(`${item}: ${metadata[0][item]}`)
    };

    // Initialize the dropdown menu
    for (item in names){
      d3.select('#selDataset').append('option').attr('value',item).text(names[item]);
    }


};

// When a new option is selected, call the optionChanged function
d3.select("#selDataset").on("change", optionChanged(this.value));

function optionChanged(dataset) {
  // Get the plot data for a given test subject
    let newdata = sortedsamples[dataset];

  // Redraw the bar graph
    let barData = {x:newdata.sample_values.slice(0,10).reverse(),
                   y: newdata.otu_ids.slice(0,10).map(object => 'OTU ' + String(object)).reverse(),
                   text: newdata.otu_labels.slice(0,10).reverse()
    };
    Plotly.restyle('bar', 'x',[barData.x]);
    Plotly.restyle('bar', 'y',[barData.y]);
    Plotly.restyle('bar', 'text',[barData.text]);

    // Redraw the bubble graph
    let bubbleData = {x:newdata.otu_ids,
                      y:newdata.sample_values,
                      text:newdata.otu_labels,
                      marker:{
                        color:newdata.otu_ids,
                        size:newdata.sample_values
                      }
    };
    Plotly.restyle('bubble','x',[bubbleData.x]);
    Plotly.restyle('bubble','y',[bubbleData.y]);
    Plotly.restyle('bubble','text',[bubbleData.text]);
    Plotly.restyle('bubble','marker',[bubbleData.marker]);

    // Redraw the metadata table
    d3.selectAll('td').remove()
    d3.selectAll('tr').remove()
    for (item in metadata[dataset]){
      d3.select('tbody').append('tr').append('td').text(`${item}: ${metadata[dataset][item]}`);
    };
};