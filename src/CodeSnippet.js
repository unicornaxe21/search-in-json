import data from "./Database.json" assert { type: "json" };

// Create a function to search the Database.json
function searchDatabase(country, university, department){
  // Retrieve the JSON file
  const data = require("./Database.json");
  
  // Create an array to store the filtered results
  let filtered = [];
  
  // Iterate through the Database.json 
  for (let i = 0; i < data.length; i++){
    // Check if the country, university and department match the search query
    if (data[i]["Country"] === country && data[i]["University"] === university && data[i]["Department"] === department){
      // Push the results to the filtered array
      filtered.push(data[i]);
    }
  }
  
  // Return the filtered results
  return filtered;
}

// Create a function to get the suggested departments
function getSuggestedDepartments(country, university){
  // Retrieve the JSON file
  const data = require("./Database.json");
  
  // Create an array to store the suggested departments
  let suggested = [];
  
  // Iterate through the Database.json 
  for (let i = 0; i < data.length; i++){
    // Check if the country and university match the search query
    if (data[i]["Country"] === country && data[i]["University"] === university){
      // Push the departments to the suggested array
      suggested.push(data[i]["Department"]);
    }
  }
  
  // Return the suggested departments
  return suggested;
}

// Create a function to filter the suggested departments by tags
function filterByTags(tags, suggested){
  // Create an array to store the filtered results
  let filtered = [];
  
  // Iterate through the suggested departments
  for (let i = 0; i < suggested.length; i++){
    // Check if the tag matches the search query
    if (suggested[i]["Field Tag"] === tags){
      // Push the results to the filtered array
      filtered.push(suggested[i]);
    }
  }
  
  // Return the filtered results
  return filtered;
}

// Create a function to download the results in CSV, JSON or XML format
function downloadResults(filtered, format){
  // Create an array to store the file contents
  let contents = [];
  
  // Iterate through the filtered results
  for (let i = 0; i < filtered.length; i++){
    // Push the data to the array
    contents.push(filtered[i]);
  }
  
  // Check the format
  if (format === "csv"){
    // Convert the data to CSV format
    let csv = json2csv(contents);
    
    // Download the CSV file
    download(csv, "results.csv", "text/csv");
  } else if (format === "json"){
    // Convert the data to JSON format
    let json = JSON.stringify(contents);
    
    // Download the JSON file
    download(json, "results.json", "application/json");
  } else if (format === "xml"){
    // Convert the data to XML format
    let xml = json2xml(contents);
    
    // Download the XML file
    download(xml, "results.xml", "text/xml");
  }
}