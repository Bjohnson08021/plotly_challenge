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
   //plotting(940)

    //plot bubble chart
    let trace2 = { 
      x: otu_ids,
      y: sample_values,
      type: "bubble",
      //orientation: "h",

  };
  // d3.json("sample.json").then(function(data) {
//     console.log(data);
//   });
 

