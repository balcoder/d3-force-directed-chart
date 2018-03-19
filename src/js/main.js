'use strict';
// National Contiguity with a Force Directed Graph using D3.js

// json data url
const url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

//data structure
//"nodes": [{ "country": "East Timor", "code": "tl" },{ "country": "Canada", "code": "ca" },]
//"links": [{ "target": 66, "source": 0 },{ "target": 3, "source": 1 },]



d3.json(url, (error, data) => {


  var width = 1000,
      height = 900;

  var svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

//set up the simulation
//nodes only for now
const simulation = d3.forceSimulation()
              .nodes(data.nodes);

//add forces
//we're going to add a charge to each node
//also going to add a centering force
simulation
    .force("charge_force", d3.forceManyBody())
    .force("center_force", d3.forceCenter(width / 2, height / 2));

//Function to choose what flag we have
// function getFlag(d){
//     if(d.sex =="M"){
//         return "blue";
//     } else {
//         return "pink";
//     }
// }

//draw circles for the nodes
const node = svg.append("g")
        .selectAll("image")
        .data(data.nodes)
        .enter()
        .append("image")
        //.append("img")
        .attr("class", function(d) { return `flag flag-${d.code}`})
        .attr("xlink:href", "/dist/images/blank.gif")


//Function to choose the line colour and thickness
//If the link type is "A" return green
//If the link type is "E" return red
// function linkColour(d){
//     console.log(d);
//     if(d.type == "A"){
//         return "green";
//     } else {
//         return "red";
//     }
// }

//draw the links on the page
const link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(data.links)
          .enter().append("line")
          .attr("stroke-width", 2)
          .style("stroke", "red");

// function to  update the locations of the circles after every tick of the simulation
// and update the link positions
function tickActions() {
    node
        .attr("x", (d) =>  d.x )
        .attr("y", (d) =>  d.y )


  //update link positions
  //simply tells one end of the line to follow one node around
  //and the other end of the line to follow the other node around
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  }

// make simulation apply our function tickActions() on every tick
simulation.on("tick", tickActions );

//Create the link force
//We need the id accessor to use named sources and targets
const link_force =  d3.forceLink(links_data)
                        //tell simulation which node corresponds to which link
                        .id(function(d) { return d.country; });

// add it to the simulation
simulation.force("links",link_force)

});//end json






// var simulation = d3.forceSimulation()
//     .force("link", d3.forceLink().id(function(d) { return d.target; }))
//     .force("charge", d3.forceManyBody())
//     .force("center", d3.forceCenter(width / 2, height / 2));
//
// d3.json(url, (error, data) => {
//   if(error) console.log("Problem loading json data; " + error)
//
//   const link = svg.append("g")
//           .attr("class", "links")
//         .selectAll("line")
//         .data(data.links)
//         .enter().append("line")
//           .attr("stroke-width", (d) => { Math.sqrt(d.value); });
//     var node = svg.append("g")
//         .attr("class", "nodes")
//       .selectAll("circle")
//       .data(data.nodes)
//       .enter().append("circle")
//         .attr("r", 5)
//         //.attr("fill", function(d) { return color(d.group); })
//         .call(d3.drag()
//             .on("start", dragstarted)
//             .on("drag", dragged)
//             .on("end", dragended));
//
//     node.append("title")
//         .text(function(d) { return d.country; });
//
//     simulation
//         .nodes(data.nodes)
//         .on("tick", ticked);
//
//     simulation.force("link")
//         .links(data.links);
//
//     function ticked() {
//       link
//           .attr("x1", function(d) { return d.source.x; })
//           .attr("y1", function(d) { return d.source.y; })
//           .attr("x2", function(d) { return d.target.x; })
//           .attr("y2", function(d) { return d.target.y; });
//
//       node
//           .attr("cx", function(d) { return d.x; })
//           .attr("cy", function(d) { return d.y; });
//     }
//   });
//
// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }
//
// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }
//
// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }
