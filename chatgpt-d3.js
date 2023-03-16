// Define the data
var data = [
  {title: "Avengers: Endgame", year: 2019, profit: 2.798},
  {title: "Avatar", year: 2009, profit: 2.789},
  {title: "Star Wars: The Force Awakens", year: 2015, profit: 2.068},
  {title: "Avengers: Infinity War", year: 2018, profit: 2.048},
  {title: "Jurassic World", year: 2015, profit: 1.668},
  {title: "The Lion King", year: 2019, profit: 1.657},
  {title: "The Avengers", year: 2012, profit: 1.519},
  {title: "Furious 7", year: 2015, profit: 1.516},
  {title: "Frozen II", year: 2019, profit: 1.450},
  {title: "Beauty and the Beast", year: 2017, profit: 1.263},
];

// Define the dimensions and margins of the chart
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
  .domain([2009, 2019])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.profit; })])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleSqrt()
  .domain([0, d3.max(data, function(d) { return +d.profit; })])
  .range([ 2, 30]);

// Add bubbles
var bubbles = svg.selectAll("bubble")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.year); })
    .attr("cy", function(d){ return y(d.profit); })
    .attr("r", function(d){ return z(d.profit); })
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "black");

// Add labels
svg.selectAll("labels")
  .data(data)
  .enter()
  .append("text")
    .attr("x", function(d){ return x(d.year); })
    .attr("y", function(d){ return y(d.profit); })
    .text(function(d){ return d.title; })
    .attr("text-anchor", "middle")
    .attr("dy", "1
