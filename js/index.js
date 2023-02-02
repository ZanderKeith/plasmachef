// load database
var res = await fetch('../data/database.json')
var tableDataRaw = await res.json()
var deviceDataRaw = await tableDataRaw["devices"]
var sourceDataRaw = await tableDataRaw["sources"]
console.log(tableDataRaw);

// functions for parsing the table
function makeTableData(devices, scenarios) {
	var tableData = {};
}

// display the table

var table = new Tabulator("#example-table", {
	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
	layout:"fitColumns", //fit columns to width of table (optional),
	data:deviceDataRaw, // as soon as data is available, assign it to table
	autoColumns:true, // snag column names from JSON until pretty printing implemented
	autoColumnsDefinitions: function (definitions) {
		return definitions.map((column) => {
		  //if (column.field.match(/(name|title)/)) {
			column.formatter = sourceLinkFormatter;
		  //}
		  return column;
		});
	},
});

const sourceLinkFormatter = function(cell) {
	var cellObject = cell.getValue()

	var value = cellObject["value"];
	if (value === undefined) {
		// This is a field that doesn't have a citation attached
		return cellObject
	}
	
	// See if this value has been included in the database yet
	if (cellObject["value"] === null) {
		return "?";
	}

	var source = cellObject["citation"];
	// TODO: go parse the sources database for this citation shorthand

	if (value["min"] === undefined) {
		// For entries with only one value
		return "<a href=" + source +">"+ value + "</a>";
	} else {
		// For entries with min / max values
		return "<a href=" + source +">"+ value["min"] + "</a>";
	}
}

var sourceLink = function(cell, formatterParams) {
	
}

