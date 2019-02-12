const express = require("express"); 
const req = require("request"); 
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile( __dirname + "/signup.html");
}); 

app.listen(3000, function(){
    console.log("Port 3000 now running");
});