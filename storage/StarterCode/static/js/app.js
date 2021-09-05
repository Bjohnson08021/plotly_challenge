
function mymetadata(sample) {
  d3.json("samples.json").then((data) => {
   let metadata = data.metadata
   console.log(metadata);
   console.log(data)

  let myarray = metadata.filter(sampleobject => sampleobject.id==sample);
  let result = myarray[0];
  console.log(myarray);
  console.log(result);
  let display = d3.select("#sample-metadata");
  display.html("");
  Object.entries(result).forEach(([a,b])=>{
    display.append("h5").text(`${a}:${b}`);
  });
});
}
