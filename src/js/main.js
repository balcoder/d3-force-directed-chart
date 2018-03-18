'use strict';
// National Contiguity with a Force Directed Graph using D3.js


// json data url
const url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

// set up the canvas
const margin = {left:20, right:50, top:20, bottom:30},
      width = 960 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

const svg = d3.select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
















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
