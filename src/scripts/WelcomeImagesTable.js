var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "WelcomeImages",
  KeySchema: [
    // Partition Key
    { AttributeName: "link", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "desc", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "link", AttributeType: "S" },
    { AttributeName: "desc", AttributeType: "S" },
    { AttributeName: "className", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "link", KeyType: "HASH" },
        { AttributeName: "className", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});