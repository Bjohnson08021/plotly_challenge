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
//get samples info from samples.json
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

 });
 }
 
function init(){
 
 
  //see dropdown
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;
    console.log(sampleNames);
    
    //parse data to get info wanted (names array)
   //get reference from select data append to options
    let dropDown = d3. select("#selDataset");
    sampleNames.forEach((c)=>{
      dropDown.append("option").text(c).property("value",c)
    })
     //see mymetadata and plotting for the first sample
     let samplePlot = sampleNames[0];
     plotting(samplePlot);
     mymetadata(samplePlot);

});
};
function optionChanged(view) {
  plotting(view);
  mymetadata(view);

};

init()
