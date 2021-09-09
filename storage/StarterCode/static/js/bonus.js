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
      if (myarray[0].wfreq ==null) {myarray[0].wfreq =0}
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: myarray[0].wfreq,
          title: { text: "Belly Button Wash Frequency (Scrubs per week)" },
          type: "indicator",
          mode: "gauge+number",
          //delta: { reference: 400 },
          gauge: { axis: { range: [null, 9] }, 
            steps: [
              { range: [0, 1], color: "e4f0f6" },
              { range: [1, 2], color: "bcd9ea" },
              { range: [2, 3], color: "8bbdd9" },
              { range: [3, 4], color: "5ba4cf" },
              { range: [4, 5], color: "298fca" },
              { range: [5, 6], color: "0079bf" },
              { range: [6, 7], color: "026aa7" },
              { range: [7, 8], color: "094c72" },
              { range: [8, 9], color: "0c3953" }
          ],
        }
        }
      ];
      
      var layout = { width: 600, height: 400 };
      Plotly.newPlot('gauge', data, layout);
 

});
});
}
function optionChanged(view) {
  mymetadata(view);
  plotting(view)

};
    