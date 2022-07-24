const allCountries = ["Afghanistan", "Africa", "Albania", "Algeria", "Americas", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Asia", "Asia, Central", "Australia", "Australia & New Zealand", "Austria", "Azerbaijan", "Bahamas", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Caribbean", "Central African Republic", "Central America", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Dominica", "Dominican Republic", "Eastern Africa", "Eastern Asia", "Eastern Europe", "Ecuador", "Egypt", "El Salvador", "Eritrea", "Estonia", "Ethiopia", "Europe", "Europe, Western", "European Union", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guyana", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Israel", "Italy", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Land Locked Developing Countries", "Latvia", "Least Developed Countries", "Lebanon", "Libya", "Lithuania", "Low Income Food Deficit Countries", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritius", "Melanesia", "Mexico", "Micronesia (region)", "Middle Africa", "Moldova", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Net Food Importing Developing Countries", "Netherlands", "New Caledonia", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Northern Africa", "Northern America", "Northern Europe", "Norway", "OECD", "Oceania", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Polynesia", "Portugal", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Serbia and Montenegro", "Seychelles", "Slovakia", "Slovenia", "Small island developing States", "South Africa", "South America", "South Eastern Asia", "South Korea", "Southern Africa", "Southern Asia", "Southern Europe", "Spain", "Sri Lanka", "Sudan", "Sudan (former)", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Uganda", "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Western Africa", "Western Asia", "World", "Yemen", "Zambia", "Zimbabwe"];

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
    .scale(120)
    .translate([width / 2, height / 1.4]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function (d) { data.set(d.code, +d.pop); })
    .await(ready);

function ready(error, topo) {

    let mouseOver = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .5)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "black")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", 1)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "transparent")
    }

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        })
        .style("stroke", "transparent")
        .attr("class", function (d) { return "Country" })
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
}

// loop through allCountries array and add elements to the element with id 'add-elements'
for (let i = 0; i < allCountries.length; i++) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    document.getElementById("add-elements").appendChild(li);
    li.appendChild(label);
    label.setAttribute("for", "checkboxcou-" + i.toString())
    label.appendChild(input)
    input.setAttribute("type", "checkbox")
    input.setAttribute("name", "checkboxcou-" + i.toString())
    label.appendChild(span)
    span.innerHTML = allCountries[i];
}