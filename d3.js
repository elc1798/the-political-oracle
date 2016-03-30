/* ---------------------- JAVASCRIPT ---------------------- */
console.log("Javascript loaded!");

/* ---------------------- D3 BABY ---------------------- */

// Data (taken from the JSON generated by crunching #s from the HuffPost API)
var barData = {'Perry': 17, 'Roemer': 2, 'Christie': 69, 'Carson': 277, 
	       'Bush': 183, 'Other': 73, 'Undecided': 899, 'Collins': 59,
	       'Bellows': 20, 'Foley': 14, 'Sanders': 1230, 'No Answer': 3,
	       'Huntsman': 17, 'Refused': 6, 'Cruz': 972, 'Slone': 1,
	       "Don't Know": 56, 'Not Voting': 4, 'Obama': 62,
	       'Will not vote': 4, 'Not Sure': 18, 'Pataki': 0,
	       'Santorum': 488, 'Janssen': 6, 'Bachmann': 6, 'Ricketts': 16,
	       'Walker': 75, 'Bruning': 34, 'Judd': 1, 'McCoy': 5,
	       "O'Malley": 5, 'Jindal': 1, 'Farrell': 6, 'Clinton': 1376,
	       'Trump': 1646, 'Carlson': 5, 'Romney': 808, 'Rubio': 668,
	       'Huckabee': 63, 'Fiorina': 35, 'Gilmore': 0, 'Kasich': 468,
	       'Someone else/Not sure': 9, 'Paul': 322, 'Gingrich': 350,
	       'Graham': 0};
var names = d3.keys(barData);
var votes = names.map(function(key){ return barData[key];});

var candidateBreakDown = {
    "Bachmann" : {'IA': 6},
    "Bellows" : {'ME': 20},
    "Bruning" : {'NE': 34},
    "Bush" : {'NH': 9, 'SC': 8, 'NJ': 7, 'CO': 2, 'NM': 5, 'WA': 12, 'AK': 7, 'MN': 7, 'MT': 20, 'IN': 6, 'IA': 4, 'KY': 13, 'NV': 5, 'CT': 10},
    "Carlson" : {'NE': 5},
    "Carson" : {'WA': 8, 'NH': 1, 'NJ': 5, 'NM': 6, 'TX': 4, 'TN': 10, 'NV': 5, 'VA': 11, 'CO': 25, 'AK': 9, 'AL': 11, 'AR': 8, 'IN': 16, 'IA': 8, 'OK': 9, 'CT': 9, 'MA': 1, 'MN': 11, 'MT': 2, 'MS': 5, 'SC': 6, 'KY': 7},
    "Christie" : {'NH': 8, 'NJ': 7, 'CO': 1, 'WA': 6, 'AK': 3, 'MN': 5, 'MT': 5, 'IN': 3, 'IA': 1, 'CT': 2},
    "Clinton" : {'NH': 44, 'MD': 61, 'CO': 44, 'LA': 61, 'WV': 44, 'MO': 46, 'NC': 56, 'MI': 52, 'RI': 49, 'KS': 33, 'OK': 40, 'SC': 64, 'AR': 57, 'VT': 13, 'IL': 31, 'GA': 59, 'IA': 46, 'MA': 48, 'OH': 52, 'FL': 58, 'ID': 45},
    "Collins" : {'ME': 59},
    "Cruz" : {'WA': 5, 'WI': 36, 'FL': 18, 'NH': 10, 'NJ': 10, 'NM': 25, 'TX': 35, 'LA': 31, 'NC': 33, 'TN': 15, 'NY': 12, 'PA': 20, 'CA': 35, 'NV': 23, 'VA': 13, 'CO': 14, 'AK': 24, 'AL': 16, 'AR': 27, 'IN': 17, 'IA': 24, 'OK': 18, 'AZ': 19, 'CT': 6, 'MD': 25, 'MA': 10, 'OH': 12, 'UT': 42, 'MN': 21, 'MT': 4, 'MS': 17, 'SC': 19, 'KY': 4},
    "Don't Know" : {'VA': 8, 'MA': 6, 'TX': 4, 'AL': 8, 'TN': 4, 'AR': 6, 'GA': 4},
    "Farrell" : {'WV': 6},
    "Fiorina" : {'NH': 3, 'NJ': 2, 'CO': 5, 'WA': 3, 'IN': 3, 'IA': 2, 'KY': 4, 'CT': 4},
    "Foley" : {'NE': 14},
    "Gilmore" : {'IA': 0, 'NJ': 0, 'CO': 0},
    "Gingrich" : {'NH': 12, 'MD': 10, 'NJ': 9, 'TX': 20, 'LA': 18, 'NC': 17, 'MI': 9, 'WI': 15, 'TN': 16, 'NY': 9, 'SC': 40, 'PA': 6, 'IL': 14, 'GA': 47, 'IA': 16, 'AZ': 18, 'FL': 31, 'OH': 18, 'NV': 25},
    "Graham" : {'CO': 0, 'CT': 0},
    "Huckabee" : {'CO': 1, 'WA': 5, 'MT': 19, 'IN': 1, 'IA': 3, 'KY': 10, 'CT': 0},
    "Huntsman" : {'IA': 2, 'NH': 15},
    "Janssen" : {'NE': 6},
    "Jindal" : {'CO': 1},
    "Judd" : {'WV': 1},
    "Kasich" : {'WI': 19, 'FL': 10, 'NH': 17, 'NJ': 8, 'NM': 4, 'TX': 9, 'LA': 6, 'NC': 11, 'TN': 5, 'NY': 1, 'PA': 30, 'CA': 14, 'NV': 9, 'VA': 7, 'CO': 1, 'AK': 2, 'AL': 5, 'AR': 4, 'IN': 1, 'IA': 2, 'OK': 6, 'AZ': 10, 'CT': 10, 'MD': 18, 'MA': 14, 'OH': 44, 'UT': 13, 'MS': 8, 'SC': 7, 'KY': 6},
    "McCoy" : {'NE': 5},
    "No Answer" : {'VA': 0, 'MA': 0, 'TX': 0, 'AL': 1, 'TN': 0, 'AR': 0, 'GA': 1},
    "Not Sure" : {'VT': 9},
    "Not Voting" : {'NJ': 4},
    "Obama" : {'CA': 62},
    "O'Malley" : {'IA': 3, 'MI': 1},
    "Other" : {'NH': 1, 'MD': 1, 'NJ': 1, 'MA': 2, 'TX': 1, 'OH': 0, 'WV': 7, 'AK': 4, 'MN': 6, 'AL': 0, 'RI': 1, 'TN': 1, 'NY': 19, 'SC': 1, 'PA': 2, 'VT': 0, 'IA': 1, 'FL': 1, 'CA': 2, 'CT': 2},
    "Pataki" : {'CO': 0, 'CT': 0},
    "Paul" : {'WA': 13, 'WI': 16, 'FL': 9, 'NH': 17, 'NJ': 7, 'TX': 8, 'LA': 8, 'NC': 11, 'TN': 13, 'NY': 8, 'PA': 7, 'NV': 15, 'VA': 26, 'CO': 3, 'AK': 3, 'IL': 8, 'GA': 9, 'IN': 5, 'IA': 22, 'AZ': 11, 'CT': 6, 'MD': 9, 'OH': 8, 'MI': 9, 'MT': 4, 'SC': 18, 'KY': 19},
    "Perry" : {'IA': 10, 'MT': 3, 'NH': 1},
    "Refused" : {'SC': 2, 'CA': 2},
    "Ricketts" : {'NE': 16},
    "Roemer" : {'LA': 2},
    "Romney" : {'NH': 37, 'MD': 52, 'NJ': 51, 'TX': 27, 'LA': 28, 'VA': 69, 'CA': 31, 'NC': 34, 'MI': 37, 'WI': 39, 'TN': 27, 'NY': 54, 'SC': 26, 'PA': 38, 'IL': 37, 'GA': 24, 'IA': 23, 'AZ': 43, 'FL': 43, 'OH': 38, 'NV': 50},
    "Rubio" : {'WA': 11, 'FL': 26, 'NH': 14, 'NJ': 11, 'NM': 19, 'TX': 16, 'LA': 15, 'NC': 7, 'TN': 18, 'NY': 4, 'NV': 19, 'VA': 26, 'CO': 19, 'AK': 7, 'AL': 19, 'AR': 20, 'IN': 17, 'IA': 17, 'OK': 21, 'AZ': 10, 'CT': 14, 'MD': 14, 'MA': 20, 'OH': 2, 'UT': 17, 'MN': 23, 'MT': 9, 'MS': 16, 'SC': 18, 'KY': 10},
    "Sanders" : {'NH': 53, 'MD': 28, 'CO': 49, 'LA': 14, 'WV': 31, 'MO': 47, 'NC': 37, 'MI': 47, 'RI': 40, 'KS': 23, 'OK': 31, 'SC': 14, 'AR': 32, 'VT': 78, 'IL': 30, 'GA': 36, 'IA': 49, 'MA': 46, 'OH': 45, 'FL': 37, 'ID': 47},
    "Santorum" : {'WA': 2, 'WI': 31, 'FL': 13, 'NH': 13, 'NJ': 14, 'TX': 35, 'LA': 42, 'NC': 30, 'TN': 34, 'NY': 21, 'PA': 42, 'NV': 8, 'CO': 0, 'IL': 31, 'GA': 15, 'IN': 1, 'IA': 18, 'AZ': 26, 'MD': 27, 'OH': 33, 'MI': 36, 'SC': 13},
    "Slone" : {'NE': 1},
    "Someone else/Not sure" : {'KY': 9},
    "Trump" : {'WI': 35, 'FL': 44, 'NH': 33, 'NJ': 38, 'NM': 24, 'TX': 32, 'LA': 48, 'NC': 44, 'TN': 48, 'NY': 64, 'PA': 33, 'CA': 36, 'NV': 39, 'VA': 36, 'CO': 17, 'AK': 28, 'AL': 42, 'AR': 34, 'IN': 26, 'IA': 31, 'OK': 34, 'AZ': 31, 'CT': 25, 'MD': 34, 'MA': 51, 'OH': 38, 'UT': 21, 'MN': 18, 'MS': 41, 'SC': 32, 'KY': 12},
    "Undecided" : {'WA': 23, 'WI': 10, 'WV': 11, 'FL': 3, 'NH': 3, 'NJ': 14, 'NM': 17, 'TX': 10, 'LA': 2, 'NC': 8, 'NE': 18, 'TN': 9, 'NY': 8, 'PA': 5, 'CA': 8, 'NV': 1, 'VA': 6, 'CO': 9, 'AK': 13, 'AL': 7, 'AR': 11, 'IL': 10, 'GA': 4, 'IA': 2, 'OK': 29, 'AZ': 1, 'CT': 11, 'ME': 22, 'MD': 2, 'MA': 1, 'OH': 1, 'UT': 7, 'MO': 13, 'MN': 9, 'MI': 10, 'RI': 11, 'KS': 44, 'MT': 16, 'MS': 13, 'SC': 2, 'KY': 15},
    "Walker" : {'MT': 19, 'KY': 11, 'WA': 13},
    "Will not vote" : {'CA': 2}
};

// Bar Graph

// The initial variable setup
var margin_top = 50;
var margin_bottom = 50;
var margin_right = 50;
var margin_left = 50;

var bar_width = 1300 - margin_left - margin_right;
var bar_height = 500 - margin_top - margin_bottom;

// Ordinal for discrete (candidate names) domain
var x = d3.scale.ordinal()
    .rangeRoundBands([0,bar_width],.05)
    .domain(names);

// Linear because...votes are tallied in numbers
var y = d3.scale.linear()
    .domain([0,d3.max(votes)])
    .range([bar_height,0]);

// Formatting the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Setting up the SVG coordinate space
var svg = d3.select("body").append("svg")
    .attr("width", margin_left + bar_width + margin_right)
    .attr("height", margin_bottom + bar_height + margin_top)
    .append("g")
    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

// Formatting the x axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + bar_height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

// Formatting the y axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Votes");

// Formatting the individual bars
svg.selectAll("bar")
    .data(names)
    .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d) { return x(d); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(barData[d]); })
    .attr("height", function(d) { return (bar_height - y(barData[d])); })
    .on("click", function(d){ drawPieChart(d,svg2); });

// Insert header
d3.select("body").append("h3");

// Pie Chart

var pie_width = 960;
var pie_height = 500;
var radius = Math.min(pie_width, pie_height) / 2;
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#A344E0",
	   "#144CF6"]);
var arc = d3.svg.arc()
    .outerRadius(radius - 15)
    .innerRadius(0);
var labelArc = d3.svg.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);
// Creates the SVG coordinate space
var svg2 = d3.select("body").append("svg")
    .attr("width", pie_width)
    .attr("height", pie_height)
    .append("g")
    .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

var candidateName = d3.select("h3")
    .attr("align", "center");

function drawPieChart(guy,svg2){
    // Clear the SVG2 canvas for the Pie Chart of anything that was previously on it
    svg2.selectAll("*").remove();
    
    // Change some text
    candidateName.text(guy + " : Total Votes " + barData[guy]);
    var states = d3.keys(candidateBreakDown[guy]);
    var stateVotes = states.map(function(key){ return candidateBreakDown[guy][key];});        
        
    var pie = d3.layout.pie()
	.sort(null) // disables sorting
	.value(function(d) { return candidateBreakDown[guy][d]; });
        
    var g = svg2.selectAll(".arc")
	.data(pie(states))
	.enter().append("g")
	.attr("class","arc");
    
    g.append("path")
	.attr("d",arc)
	.style("fill", function(d) { return color(d.data); });
    
    g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.attr("dy", ".35em")
	.text(function(d) { return d.data /*+ " : " + d.value*/; });
}

