//get data for demographics
function mymetadata(sample) {
  d3.json("samples.json").then((data) => {
//get metadata information from samples.json
   let metadata = data.metadata
   console.log(metadata);
   console.log(data)
//pulling metadata objects out of array
  let myarray = metadata.filter(sampleobject => sampleobject.id==sample);
  let result = myarray[0];
  console.log(myarray);
  console.log(result);
//reference from index.html "sample-metadata"
  let display = d3.select("#sample-metadata");
  display.html("");
//loop to get metadata info into the demographics box
  Object.entries(result).forEach(([a,b])=>{
    display.append("h5").text(`${a}:${b}`);
  });
});
}

//plot bar and bubble charts
function plotting(nameID){
  d3.json("samples.json").then((data) => {
    let samples = data.samples;
    console.log(samples)
//filtering info using names to call samples info from samples.json
    let name = samples.filter(object => object.id==nameID)[0];
    console.log(name)
    let otu_ids = name.otu_ids;
    let otu_labels = name.otu_labels;
    let sample_values = name.sample_values; 
 //plot bar graph
    let trace1 = {
     x: sample_values.slice(0,10).reverse(),
     y: otu_ids.slice(0,10).map(object=>`OTU${object}`).reverse(),
     type: "bar",
     orientation: "h",
    };
    let barchart = [trace1];
    let labels = {
      title: "Top ten OTU's"
    };
  //reference id="bar" from html
   Plotly.newPlot("bar", barchart, labels);
   
    //plot bubble chart
    let trace2 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      text:otu_labels,
      marker:{
       //size is the size of sample values
        size: sample_values,
        color: otu_ids
      }
     };
     let bubblechart = [trace2];
     let bubble_labels = {
       title: "Bacteria Per sample"
     };
    
  //reference id="bubble" from index.html
  Plotly.newPlot("bubble", bubblechart, bubble_labels);
  
  //plot gauge chart
  //  let clean = data.metadata;
    
  // let trace3 = {
  //   domain: { x: [0, 1], y: [0, 1] },
  //   value: clean.wfreq,
  //   title: { text: "Belly Button Washing Frequeny (scrubs per week)" },
  //   type: "indicator",
  //   mode: "gauge+number",
  //   gauge: {
  //     axis: { range: [null, 9] },
  //     steps: [
  //       { range: [0, 1], color: "white" },
  //       { range: [1, 2], color: "tan" },
  //       { range: [2, 3], color: "lightgrey" },
  //       { range: [3, 4], color: "mossgreen" },
  //       { range: [4, 5], color: "lightgreen" },
  //       { range: [5, 6], color: "green" },
  //       { range: [6, 7], color: "olive" },
  //       { range: [7, 8], color: "darkgreen" },
  //       { range: [8, 9], color: "emerald" }
      });
      
    };
    mymetadata(940)
    plotting(940)
//   var x = [];
//   var y = [];

//   if (dataset === 'dataset1') {
//     x = [1, 2, 3, 4, 5];
//     y = [1, 2, 4, 8, 16];
//   }

//   else if (dataset === 'dataset2') {
//     x = [10, 20, 30, 40, 50];
//     y = [1, 10, 100, 1000, 10000];
//   }

//   // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);
// }

// init()