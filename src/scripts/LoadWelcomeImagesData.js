var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to WelcomeImages table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var welcomeImagesData = 
  JSON.parse(fs.readFileSync('../components/data/welcome_images.json', 'utf8'));

  welcomeImagesData.forEach(function(welcomeImage) {
  var className = welcomeImage.className;
  if (className.trim() == "")
    className = "no_class";

  var params = {
    TableName: "WelcomeImages",
    Item: {
      "link": welcomeImage.link,
      "desc": welcomeImage.desc,
      "className": className
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
              welcomeImage.link, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", welcomeImage.link, "to table.")
  });
});