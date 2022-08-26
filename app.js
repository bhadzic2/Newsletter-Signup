//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME:firstName,
        LNAME: lastName
      }
    }]
  }
  //console.log(firstName,lastName,email);
  const jsonData = JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/736289169b";
const options={
  method: "POST",
  auth:"belma:775a81ed92980e4e1093294a134019b3-us14"
}
  const request=https.request(url, options, function(response) {

if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html");

}else{
  res.sendFile(__dirname+"/failure.html");
}
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});

//API
//3b979e36e3be066802a79b4ef0426159-us14
//listid
//736289169b
