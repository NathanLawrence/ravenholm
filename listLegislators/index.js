var pg = require("pg");

exports.handler = function(event, context) {

var conn = "pg://accessmo:Loc8kbiaJesse!@amtestfromdump.cs0kfi7erovq.us-east-1.rds.amazonaws.com:5432/accessmo";

var client = new pg.Client(conn);
client.connect();
//var id = event.id;
var query = client.query("SELECT id, name_first, name_last, nickname, party_id  FROM legislative.legislators");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    var jsonString = JSON.stringify(result.rows);
    var jsonObj = JSON.parse(jsonString);
    client.end();
    context.succeed(jsonObj);
});
};