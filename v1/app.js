var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req,res){
  var campgrounds = [
    {name: "Toconos", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg" },
    {name: "Black Forest", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Hill Range", image: "https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg"}
  ]
  res.render("campgrounds",{ campgrounds: campgrounds });
});



app.listen(3000,function(){
  console.log("Yelp camp server started at port 3000");
});