
// Use the D3 library to read in `samples.json`.
function getData(sampleid){

    d3.json("./data/samples.json").then(function(data) {
    console.log(data);
// 4. Display the sample metadata, i.e., an individual's demographic information.

    var metaData = data.metadata.filter(row => row.id.toString() === sampleid);
    console.log("All metaData is :", metaData);
    
    d3.select(".panel-body").html("");
    
    Object.entries(metaData[0]).forEach(([k,v]) => {
      d3.select(".panel-body").append("h6").text(`${k} : ${v}`);
    
    });
  
  });
}
// getData(sampleid);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function getBarPlot(sampleid){

d3.json("./data/samples.json").then(function(data) {
  var samples= data.samples.filter(row => row.id===sampleid)[0];
  console.log(samples);


         
// * Use `sample_values` as the values for the bar chart.
var sampleValues = samples.sample_values.slice(0,10).reverse();

// * Use `otu_ids` as the labels for the bar chart.
var otuIds = samples.otu_ids;
var slicedOtuIds=otuIds.slice(0,10).reverse();

//Reverse the array to accomodate Plotly's defaults
var OTUid= slicedOtuIds.map(row => "OTU"+" "+row);
console.log(OTUid);

// * Use `otu_labels` as the hovertext for the chart.
var otuLabels =samples.otu_labels;

var trace1 = {
  type: 'bar',
  x: sampleValues,
  y: OTUid,
  orientation: 'h'
};

var data=[trace1];

var layout= {
  title: "Top 10 OTU",
  margin:{
      l:100,
      r:100,
      t:100,
      b:100
  }
}
Plotly.newPlot("bar",data,layout);
});
}
// getBarPlot(sampleid);

// 3. Create a bubble chart that displays each sample.
function getBubbleChart(sampleid){

  d3.json("./data/samples.json").then(function(data) {
    var samples= data.samples.filter(row => row.id===sampleid)[0];
    console.log(samples);
  // * Use `sample_values` as the values for the bar chart.
  var sampleValues = samples.sample_values;
  
 // * Use `otu_ids` for the x values.
  var otuIds = samples.otu_ids;
  
 // * Use `sample_values` for the y values.
  var otuLabels =samples.otu_labels;

var trace2 = {
  x: otuIds,
  y: sampleValues,
  text: otuLabels,
  mode: 'markers',
  marker: {
    color: otuIds,
    size: sampleValues
  }
};

var data2 = [trace2];

var layout2 = {
  title: 'Bubble Chart OTU',
  xaxis:{
    title: "OTU ID"
  },
  showlegend: false,
  height: 600,
  width: 1100
};

Plotly.newPlot('bubble', data2, layout2);
  });
}
// getBubbleChart(sampleid);

// 6. Update all of the plots any time that a new sample is selected.
function getId(){
  
  d3.json("./data/samples.json").then(function(data){
    console.log(data);
    
  
  var IDs = data.samples.map(row => row.id);
  
  IDs.forEach(function(row){
    var dropdownMenu = d3.select("#selDataset");
      var opt= dropdownMenu.append("option");
      opt.property("value",row);
      opt.text(row);
  });
  });
  }
  getId();

  function optionChanged(sampleid){
    getBarPlot(sampleid);
    getBubbleChart(sampleid);
    getData(sampleid);
  };
 
// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below: