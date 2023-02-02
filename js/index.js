var res = await fetch('../data/database.json')
var table_data = await res.json()
console.log(table_data)


var table = new Tabulator("#example-table", {
	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value), //assign data to table
	layout:"fitColumns", //fit columns to width of table (optional),
	ajaxURL:"data/database.json",
	autoColumns:true,
});



//trigger an alert message when the row is clicked
table.on("rowClick", function(e, row){ 
	// alert("Row " + row.getData().id + " Clicked!!!!");
	table.setData(table_data[1]["devices"]);
	console.log(table_data[1])
});