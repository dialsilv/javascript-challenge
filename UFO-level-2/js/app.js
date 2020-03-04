// from data.js
var tableData = data;

// stores the input date from the user
var button = d3.select("#button");

// adds all the data in the table
tableData.forEach((date) => {
    var location = d3.select("tbody");
    var row = location.append("tr");
    Object.entries(date).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value); 
    });
});

// Selects the input element and gets the raw HTML node
var inputFieldDate = d3.select("#sights-form-input-date");
var inputFieldCity = d3.select("#sights-form-input-city");
var inputFieldState = d3.select("#sights-form-input-state");
var inputFieldCountry = d3.select("#sights-form-input-country");
var inputFieldShape = d3.select("#sights-form-input-shape");


function reloadTable() {

    // deletes the displayed rows of the table
    d3.selectAll("tbody>tr").remove();

    // filters the data set with the input date
    var filteredTable = tableData.filter((occurence) => {
        var dateInput = inputFieldDate.property("value");
        var cityInput = inputFieldCity.property("value");
        var stateInput = inputFieldState.property("value");
        var countryInput = inputFieldCountry.property("value");
        var shapeInput = inputFieldShape.property("value");

        var filters = [ {input: "datetime", value: dateInput},
            {input: "city", value: cityInput},
            {input: "state", value: stateInput},
            {input: "country", value: countryInput},
            {input: "shape", value: shapeInput}
        ];

        var filterReturn = [];
        
        filters.map ((filter) => {
            if (filter.value !== "") {
                return filterReturn.push(`occurence.${filter.input} === "${filter.value}"`);
            }
        }
        );

        var finalFilter = filterReturn.join(" && ");

        console.log(finalFilter);

    return eval(finalFilter); 

    });

    console.log(filteredTable);

    // appends the table with filtered data
    filteredTable.forEach((x) => {
        var location = d3.select("tbody");
        var row = location.append("tr");
        Object.entries(x).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value); 
        });
    });
};


// Complete the handler for the form
// on click
button.on("click", reloadTable);

// // on pressing enter
// // (big shout on Heain for helping me finding the solution for clicking enter)
// inputFieldDate.on("keydown", function() { 
//     if (event.key === "Enter") {
//         event.preventDefault();
//         reloadTable();
//     }
// });

// // on clicking anywhere else on the page
// inputFieldDate.on("change", reloadTable);
