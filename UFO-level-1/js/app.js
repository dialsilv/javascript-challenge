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

// Select the input element and get the raw HTML node
// Get the value property of the input element
var inputField = d3.select("#sights-form-input");

function reloadTable() {

    // deletes the displayed rows of the table
    d3.selectAll("tbody>tr").remove();

    // filters the data set with the input date
    var filteredTable = tableData.filter((occurence) => {
    return occurence.datetime === inputField.property("value");
    });

    // appends the table with filtered data
    filteredTable.forEach((date) => {
        var location = d3.select("tbody");
        var row = location.append("tr");
        Object.entries(date).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value); 
        });
    });
};


// Complete the handler for the form
// on click
button.on("click", reloadTable);

// on pressing enter
// (big shout on Heain for helping me finding the solution for clicking enter)
inputField.on("keydown", function() { 
    if (event.key === "Enter") {
        event.preventDefault();
        reloadTable();
    }
});

// on clicking anywhere else on the page
inputField.on("change", reloadTable);
