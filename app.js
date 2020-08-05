const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extented:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/singup.html");
});

app.post("/",function(req,res){
  console.log("this is working...bro ");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  console.log(firstName + lastName + emailId);

  const data = {
    members : [{
        email_address : emailId,
        status : "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
    }
   ]
 };

const jsondata = JSON.stringify(data);
const url = "https://us20.api.mailchimp.com/3.0/lists/e3375a9a6f";
const option = {method:'post',auth:"Anmol:a93bd4b2130519c640e9f4ad428858596-us20"};
const reqst = https.request(url,option,function(responce){
if(responce.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}else{
  res.sendFile(__dirname+"/failure.html");
}
  responce.on("data",function(data){
    console.log(JSON.parse(data));
  });
 });
 reqst.write(jsondata);
 reqst.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
  console.log("The server is running at port 3000");
})




//api Email
//93bd4b2130519c640e9f4ad428858596-us20

//audience id :
//e3375a9a6f
