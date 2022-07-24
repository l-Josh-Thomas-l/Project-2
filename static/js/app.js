var tableData = data;

var F_table = d3.select("tbody");

function clearBuildTable(tableData) {
    
    F_table.html("");
        
        tableData.forEach(function(fert) {
            
            console.log(fert);

            var row = F_table.append("tr");

            Object.entries(fert).forEach(function([key, value]) {
                
                console.log(key, value);

                var Cell = row.append("td");
                
                Cell.text(value);
        });
    });
};

clearBuildTable(tableData);

function clickFilter(){
    
    var inputEntity = d3.select("#Entity").property("value");

    //var inputCode = d3.select("#Code").property("value");

    var inputYear = d3.select("#Year").property("value");

    //var inputFC = d3.select("#Fertilizer consumption (kilograms per hectare of arable land)").property("value");


    let FilteredData = tableData;
    if (inputEntity) {FilteredData = FilteredData.filter(row=> row.Entity === inputEntity); }
    //if (inputCode) {FilteredData = FilteredData.filter(row=> row.Code === inputCode); }
    if (inputYear) {FilteredData = FilteredData.filter(row=> row.Year === inputYear); }
    //if (inputFC) {FilteredData = FilteredData.filter(row=> row.Fertilizer_consumption === inputFC); }
    
    clearBuildTable(FilteredData)
};

d3.selectAll("#filter-btn").on("click", clickFilter) 