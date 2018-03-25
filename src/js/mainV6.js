const width = 960,
      height = 600;

const url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

const graph = d3.select('#container');

const svg = graph.append('svg')
	        .attr("width", width)
	        .attr("height", height);

var force = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000))
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

        var link = svg.selectAll(".link")
            .data(json.links)
            .enter()
            .append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        node.append('circle')
            .attr('r', 13)
            .attr('fill', "black");

        node.append("text")
            .attr("dx", -18)
            .attr("dy", 8)
            .style("font-family", "overwatch")
            .style("font-size", "18px")
            .text(function (d) {
                return d.name
            });

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
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
  });
