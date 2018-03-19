// Define the dimensions
var width = 640,
    height = 480;


// data
var nodes = [
  { x:   width/3, y: height/2 },
  { x: 2*width/3, y: height/2 }
];
var links = [
  { source: 0, target: 1 }
];

var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

d3.json(url, (error, data) => {
//add svg to body
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);


  // Now we create a force layout object and define its properties.
  // Those include the dimensions of the visualization and the arrays
  // of nodes and links.
  var force = d3.layout.force()
      .size([width, height])
      .nodes(data.nodes)
      .links(data.links);

// add distince between nodes
force.linkDistance(15);

//add empty nodes and links to the svg with links first so nodes appear on top of
//links
var link = svg.selectAll('.link')
    .data(data.links)
    .enter().append('line')
    .attr('class', 'link');

var node = svg.selectAll('.node')
    .data(data.nodes)
    .enter().append('circle')
    .attr('class', 'node');

force.on('end', function() {
  // When this function executes, the force layout
      // calculations have concluded. The layout will
      // have set various properties in our nodes and
      // links objects that we can use to position them
      // within the SVG container.

      // First let's reposition the nodes. As the force
      // layout runs it updates the `x` and `y` properties
      // that define where the node should be centered.
      // To move the node, we set the appropriate SVG
      // attributes to their new values. We also have to
      // give the node a non-zero radius so that it's visible
      // in the container.
      node.attr('r',5)
       .attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; });

   // We also need to update positions of the links.
   // For those elements, the force layout sets the
   // `source` and `target` properties, specifying
   // `x` and `y` values in each case.

   link.attr('x1', function(d) { return d.source.x; })
       .attr('y1', function(d) { return d.source.y; })
       .attr('x2', function(d) { return d.target.x; })
       .attr('y2', function(d) { return d.target.y; });

});

// Okay, everything is set up now so it's time to turn
// things over to the force layout. Here we go.

force.start();
});
