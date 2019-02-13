const express = require("express"); 
const request = require("request"); 
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile( __dirname + "/signup.html");
}); 
app.post("/", function(req,res){
    var firstName = req.body.fName; 
    var lastName = req.body.lName; 
    var email = req.body.email; 

    var data = {
        members: [
            {email_address: email,
             status: "subscribed",
             merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
             }
            }
        ]
    };

    var jsonData = JSON.stringify(data)

    var options = {
        url:"https://us20.api.mailchimp.com/3.0/lists/16319cf120",
        method: "POST",
        headers: {
            "Authorization":"ma1 fc7ebb5e913f372a5b7d3fdc5d0e642b-us20"
        },
        body: jsonData
    };


    request(options,function(err,res,body){
        if(err){
            console.log(err);
        }
        else{
            console.log(res.statusCode);
        }
            
    })

    console.log(firstName + lastName + email);
});

app.listen(3000, function(){
    console.log("Port 3000 now running");
});

//api key 
//fc7ebb5e913f372a5b7d3fdc5d0e642b-us20

//list id 
//16319cf120

