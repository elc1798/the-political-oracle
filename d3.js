/* ---------------------- JAVASCRIPT ---------------------- */
console.log("Javascript loaded!");

/* ---------------------- D3 BABY ---------------------- */
var margin_top = 50;
var margin_bottom = 50;
var margin_right = 50;
var margin_left = 50;

var width = 700 - margin_left - margin_right;
var height = 350 - margin_top - margin_bottom;

var x = d3.scale.ordinal().rangeRoundBands( [0,width], .05);
var y = d3.scale.linear().range([height,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", margin_left + width + margin_right)
    .attr("height", margin_bottom + height + margin_top)
    .append("g")
    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

d3.csv("bar-data.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});

