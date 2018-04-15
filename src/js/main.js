//D3 Force Directed graph

const width = 900,
      height = 600;
// json data
const url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

const graph = d3.select('#graph');

// append an svg with our dimensions to the graph selection
const svg = graph.append('svg')
	        .attr("width", width)
	        .attr("height", height)

// create a new simulation
var force = d3.forceSimulation()
            .force("charge", d3.forceManyBody())
            //.strength(-700).distanceMin(20).distanceMax(50))
            .force("link", d3.forceLink().id(function(d) { return d.index }))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("y", d3.forceY(0.001))
            .force("x", d3.forceX(0.001))

function dragstarted(d) {
    if (!d3.event.active) force.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) force.alphaTarget(0.5);
    d.fx = null;
    d.fy = null;
}

d3.json(url, function(error, json){
  if (error) throw error;

        force.nodes(json.nodes)
             .force("link").links(json.links)

// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.
        var link = svg.selectAll(".link")
            .data(json.links)
            .enter()
            .append("line")
            .attr("class", "link");

// add an img per node via the graph selection
        var node = graph.select(".flag-holder").selectAll(".node")
            .data(json.nodes)
            .enter().append("img")
            .attr('class', d => 'flag flag-' + d.code)
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        node.append("text")
            .attr("dx", -18)
            .attr("dy", 18)
            .style("font-family", "'Slabo 27px', serif")
            .style("font-size", "10px")
            .text(function (d) {
                return d.country
            });
//use simulation.on to listen for tick events as the simulation runs
        force.on("tick", function () {
            link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
// on each tick of the d3 graph add the style left and top for img
            node.style('left', d => (d.x - 8) + "px")
			          .style('top', d => (d.y - 5) + "px");

        });
  });
