var width = 1000,
    height = 900;

var svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height);

const url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json"


d3.json(url, (error, json) => {
  if(error) return ("Problem loading json data: " + error);




  var simulation = d3.forceSimulation()
                .nodes(json.nodes)
                //.links(json.links)
                .force("charge_force", d3.forceManyBody())
                .force("center_force", d3.forceCenter(width / 2, height/2 ));

 //draw circles for the nodes
  var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(json.nodes)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("fill", "red");


  //apply our function tickActions() on every tick
  simulation.on("tick", tickActions );

  //Create the link force
  //We need the id accessor to use named sources and targets
  var link_force =  d3.forceLink(json.links)
                .id(function(d) { return d.country; });

  simulation.force("links",link_force)

  //draw lines for the links
var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(json.links)
      .enter().append("line")
      .attr("stroke-width", 2);

  // The complete tickActions function
function tickActions() {
    //update circle positions each tick of the simulation
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    //update link positions
    //simply tells one end of the line to follow one node around
    //and the other end of the line to follow the other node around
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    }
  });
