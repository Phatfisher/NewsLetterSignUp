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
        url:"",
        method: "POST",
        headers: {
            "Authorization":""
        },
        body: jsonData
    };


    request(options,function(err,response,body){
        if(err){
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            if(response.statusCode === 200){
                res.sendFile( __dirname + "/success.html"); 
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        }
            
    })
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Port 3000 now running");
});


