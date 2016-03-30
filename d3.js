/* ---------------------- JAVASCRIPT ---------------------- */
console.log("Javascript loaded!");

/* ---------------------- D3 BABY ---------------------- */

// Data (taken from the JSON generated by crunching #s from the HuffPost API)
var barData = {
    'Perry': 6,
    'Christie': 69,
    'Carson': 277,
    'Bush': 183,
    'Other': 65,
    'Undecided': 790,
    'Sanders': 1230,
    'No Answer': 3,
    'Refused': 6,
    'Cruz': 972,
    "Don't Know": 56,
    'Will not vote': 4,
    'None': 0,
    'Not Sure': 18,
    'Pataki': 0,
    'Santorum': 6,
    'Walker': 75,
    "O'Malley": 5,
    'Jindal': 1,
    'Farrell': 6,
    'Clinton': 1376,
    'Trump': 1646,
    'Carlson': 5,
    'Rubio': 668,
    'Huckabee': 63,
    'Fiorina': 35,
    'Gilmore': 0,
    'Kasich': 468,
    'Someone else/Not sure': 9,
    'Paul': 83,
    'Graham': 0
};

var names = d3.keys(barData);
var votes = names.map(function(key) {
    return barData[key];
});

var candidateBreakDown = {
    "bush": {
        'NH': 9,
        'SC': 8,
        'NJ': 7,
        'CO': 2,
        'NM': 5,
        'WA': 12,
        'AK': 7,
        'MN': 7,
        'MT': 20,
        'IN': 6,
        'IA': 4,
        'KY': 13,
        'NV': 5,
        'CT': 10
    },
    "carlson": {
        'NE': 5
    },
    "carson": {
        'WA': 8,
        'NH': 1,
        'NJ': 5,
        'NM': 6,
        'TX': 4,
        'TN': 10,
        'NV': 5,
        'VA': 11,
        'CO': 25,
        'AK': 9,
        'AL': 11,
        'AR': 8,
        'IN': 16,
        'IA': 8,
        'OK': 9,
        'CT': 9,
        'MA': 1,
        'MN': 11,
        'MT': 2,
        'MS': 5,
        'SC': 6,
        'KY': 7
    },
    "christie": {
        'NH': 8,
        'NJ': 7,
        'CO': 1,
        'WA': 6,
        'AK': 3,
        'MN': 5,
        'MT': 5,
        'IN': 3,
        'IA': 1,
        'CT': 2
    },
    "clinton": {
        'NH': 44,
        'MD': 61,
        'CO': 44,
        'LA': 61,
        'WV': 44,
        'MO': 46,
        'NC': 56,
        'MI': 52,
        'RI': 49,
        'KS': 33,
        'OK': 40,
        'SC': 64,
        'AR': 57,
        'VT': 13,
        'IL': 31,
        'GA': 59,
        'IA': 46,
        'MA': 48,
        'OH': 52,
        'FL': 58,
        'ID': 45
    },
    "cruz": {
        'WA': 5,
        'WI': 36,
        'FL': 18,
        'NH': 10,
        'NJ': 10,
        'NM': 25,
        'TX': 35,
        'LA': 31,
        'NC': 33,
        'TN': 15,
        'NY': 12,
        'PA': 20,
        'CA': 35,
        'NV': 23,
        'VA': 13,
        'CO': 14,
        'AK': 24,
        'AL': 16,
        'AR': 27,
        'IN': 17,
        'IA': 24,
        'OK': 18,
        'AZ': 19,
        'CT': 6,
        'MD': 25,
        'MA': 10,
        'OH': 12,
        'UT': 42,
        'MN': 21,
        'MT': 4,
        'MS': 17,
        'SC': 19,
        'KY': 4
    },
    "don't_know": {
        'VA': 8,
        'MA': 6,
        'TX': 4,
        'AL': 8,
        'TN': 4,
        'AR': 6,
        'GA': 4
    },
    "farrell": {
        'WV': 6
    },
    "fiorina": {
        'NH': 3,
        'NJ': 2,
        'CO': 5,
        'WA': 3,
        'IN': 3,
        'IA': 2,
        'KY': 4,
        'CT': 4
    },
    "gilmore": {
        'IA': 0,
        'NJ': 0,
        'CO': 0
    },
    "graham": {
        'CO': 0,
        'CT': 0
    },
    "huckabee": {
        'CO': 1,
        'WA': 5,
        'MT': 19,
        'IN': 1,
        'IA': 3,
        'KY': 10,
        'CT': 0
    },
    "jindal": {
        'CO': 1
    },
    "kasich": {
        'WI': 19,
        'FL': 10,
        'NH': 17,
        'NJ': 8,
        'NM': 4,
        'TX': 9,
        'LA': 6,
        'NC': 11,
        'TN': 5,
        'NY': 1,
        'PA': 30,
        'CA': 14,
        'NV': 9,
        'VA': 7,
        'CO': 1,
        'AK': 2,
        'AL': 5,
        'AR': 4,
        'IN': 1,
        'IA': 2,
        'OK': 6,
        'AZ': 10,
        'CT': 10,
        'MD': 18,
        'MA': 14,
        'OH': 44,
        'UT': 13,
        'MS': 8,
        'SC': 7,
        'KY': 6
    },
    "no_answer": {
        'VA': 0,
        'MA': 0,
        'TX': 0,
        'AL': 1,
        'TN': 0,
        'AR': 0,
        'GA': 1
    },
    "none": {
        'NJ': 0
    },
    "not_sure": {
        'VT': 9
    },
    "o'malley": {
        'IA': 3,
        'MI': 1
    },
    "other": {
        'NH': 0,
        'MD': 1,
        'NJ': 2,
        'MA': 2,
        'TX': 1,
        'OH': 0,
        'WV': 7,
        'AK': 4,
        'MN': 6,
        'AL': 0,
        'RI': 1,
        'NY': 19,
        'VT': 0,
        'SC': 0,
        'FL': 0,
        'CA': 2,
        'CT': 2
    },
    "pataki": {
        'CO': 0,
        'CT': 0
    },
    "paul": {
        'CO': 3,
        'WA': 13,
        'AK': 3,
        'MT': 4,
        'IN': 5,
        'IA': 4,
        'KY': 19,
        'CT': 6
    },
    "perry": {
        'MT': 3
    },
    "refused": {
        'SC': 2,
        'CA': 2
    },
    "rubio": {
        'WA': 11,
        'FL': 26,
        'NH': 14,
        'NJ': 11,
        'NM': 19,
        'TX': 16,
        'LA': 15,
        'NC': 7,
        'TN': 18,
        'NY': 4,
        'NV': 19,
        'VA': 26,
        'CO': 19,
        'AK': 7,
        'AL': 19,
        'AR': 20,
        'IN': 17,
        'IA': 17,
        'OK': 21,
        'AZ': 10,
        'CT': 14,
        'MD': 14,
        'MA': 20,
        'OH': 2,
        'UT': 17,
        'MN': 23,
        'MT': 9,
        'MS': 16,
        'SC': 18,
        'KY': 10
    },
    "sanders": {
        'NH': 53,
        'MD': 28,
        'CO': 49,
        'LA': 14,
        'WV': 31,
        'MO': 47,
        'NC': 37,
        'MI': 47,
        'RI': 40,
        'KS': 23,
        'OK': 31,
        'SC': 14,
        'AR': 32,
        'VT': 78,
        'IL': 30,
        'GA': 36,
        'IA': 49,
        'MA': 46,
        'OH': 45,
        'FL': 37,
        'ID': 47
    },
    "santorum": {
        'IA': 1,
        'CO': 0,
        'WA': 2,
        'IN': 1
    },
    "someone_else_not_sure": {
        'KY': 9
    },
    "trump": {
        'WI': 35,
        'FL': 44,
        'NH': 33,
        'NJ': 38,
        'NM': 24,
        'TX': 32,
        'LA': 48,
        'NC': 44,
        'TN': 48,
        'NY': 64,
        'PA': 33,
        'CA': 36,
        'NV': 39,
        'VA': 36,
        'CO': 17,
        'AK': 28,
        'AL': 42,
        'AR': 34,
        'IN': 26,
        'IA': 31,
        'OK': 34,
        'AZ': 31,
        'CT': 25,
        'MD': 34,
        'MA': 51,
        'OH': 38,
        'UT': 21,
        'MN': 18,
        'MS': 41,
        'SC': 32,
        'KY': 12
    },
    "undecided": {
        'WA': 23,
        'WI': 10,
        'WV': 11,
        'FL': 5,
        'NH': 3,
        'NJ': 11,
        'NM': 17,
        'TX': 3,
        'LA': 25,
        'NC': 5,
        'NE': 18,
        'NY': 1,
        'PA': 17,
        'CA': 11,
        'CO': 9,
        'AK': 13,
        'AL': 7,
        'AR': 11,
        'IL': 39,
        'IA': 2,
        'OK': 29,
        'AZ': 30,
        'CT': 11,
        'ME': 22,
        'MD': 10,
        'MA': 1,
        'OH': 3,
        'UT': 7,
        'MO': 13,
        'MN': 9,
        'RI': 11,
        'KS': 44,
        'MT': 16,
        'MS': 13,
        'SC': 22,
        'KY': 15
    },
    "walker": {
        'MT': 19,
        'KY': 11,
        'WA': 13
    },
    "will_not_vote": {
        'CA': 2
    },
};

var parties = {
    'perry': 'rep',
    'christie': 'rep',
    'carson': 'rep',
    'bush': 'rep',
    'other': 'none',
    'undecided': 'none',
    'sanders': 'dem',
    'no answer': 'none',
    'refused': 'none',
    'cruz': 'rep',
    'don\'t know': 'none',
    'will not vote': 'none',
    'none': 'none',
    'not sure': 'none',
    'pataki': 'rep',
    'santorum': 'rep',
    'walker': 'rep',
    'o\'malley': 'dem',
    'jindal': 'rep',
    'farrell': '',
    'clinton': 'dem',
    'trump': 'rep',
    'carlson': 'rep',
    'rubio': 'rep',
    'huckabee': 'rep',
    'fiorina': 'rep',
    'gilmore': 'rep',
    'kasich': 'rep',
    'someone else/not sure': 'rep',
    'paul': 'rep',
    'graham': 'rep',
}

// Bar Graph

// The initial variable setup
var margin_top = 50;
var margin_bottom = 200;
var margin_right = 50;
var margin_left = 50;

var bar_width = 1300 - margin_left - margin_right;
var bar_height = 700 - margin_top - margin_bottom;

// Ordinal for discrete (candidate names) domain
var x = d3.scale.ordinal()
    .rangeRoundBands([0, bar_width], .05)
    .domain(names);

// Linear because...votes are tallied in numbers
var y = d3.scale.linear()
    .domain([0, d3.max(votes)])
    .range([bar_height, 0]);

// Formatting the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Setting up the SVG coordinate space
var svg = d3.select("primarychart").append("svg")
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
    .attr("transform", "rotate(-90)");

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

var hehe = "";

svg.selectAll("bar")
    .data(names)
    .enter().append("rect")
    .style("fill", function(d) {
        d = d.toLowerCase();
		if (parties[d] === "dem") {
        	return "steelblue";
		} else if (parties[d] === "rep") {
			return "#FF0202";
		} else {
			return "#020202";
		}
    })
    .attr("x", function(d) {
        return x(d);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
        return y(barData[d]);
    })
    .attr("height", function(d) {
        return (bar_height - y(barData[d]));
    })
    .on("click", function(d) {
        drawPieChart(d, svg2);
    });

// Insert header
d3.select("body").append("h3");

// Pie Chart

var pie_width = 960;
var pie_height = 500;
var radius = Math.min(pie_width, pie_height) / 2;
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#A344E0",
        "#144CF6"
    ]);

var arc = d3.svg.arc()
    .outerRadius(radius - 15)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

// Creates the SVG coordinate space
var svg2 = d3.select("piechart").append("svg")
    .attr("width", pie_width)
    .attr("height", pie_height)
    .append("g")
    .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

var candidateName = d3.select("h3")
    .attr("align", "center");

var drawPieChart = function drawPieChart(guy, svg2) {
    // Clear the SVG2 canvas for the Pie Chart of anything that was previously on it
    svg2.selectAll("*").remove();

    // Change some text
    candidateName.text(guy + " : Total Votes " + barData[guy]);
    guy = guy.toLowerCase();
    var states = d3.keys(candidateBreakDown[guy]);
    var stateVotes = states.map(function(key) {
        return candidateBreakDown[guy][key];
    });

    var pie = d3.layout.pie()
        .sort(null) // disables sorting
        .value(function(d) {
            return candidateBreakDown[guy][d];
        });

    var g = svg2.selectAll(".arc")
        .data(pie(states))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data);
        });

    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function(d) {
            return d.data /*+ " : " + d.value*/ ;
        });
}
