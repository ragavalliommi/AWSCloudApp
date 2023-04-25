var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to ServicesAmenities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var servicesAmenitiesData = 
  JSON.parse(fs.readFileSync('../components/data/services_amenities.json', 'utf8'));

  servicesAmenitiesData.forEach(function(service) {
  var params = {
    TableName: "ServicesAmenities",
    Item: {
      "text": service.text
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for services_amenities",
        service.text, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", service.text, "to table.")
  })
});