
function write_to_file(name,obj){
    const fs = require('fs');
  

    // stringify JSON Object
    var jsonContent = JSON.stringify(obj);
    console.log(jsonContent);
    
    fs.writeFile( name+".json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
  }
  module.exports.idk = function ()  {
      console.log("hi")
       return "test"
  }