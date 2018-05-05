var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB    = require("./seeds");


seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");



// Campground.create({
//   name: "Black Forest",
//   image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
//   description: "a place to set up tents midst the lush darf green forest"
//   },
//   function(err,campground){
//     if(err){
//       console.log(err)
//     }else{
//       console.log("Newly created campground");
//       console.log(campground);
//     }
//   }
//   );

  // var campgrounds = [
  //   {name: "Toconos", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg" },
  //   {name: "Black Forest", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
  //   {name: "Hill Range", image: "https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg"},
  //   {name: "Toconos", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg" },
  //   {name: "Black Forest", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
  //   {name: "Hill Range", image: "https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg"},
  //   {name: "Toconos", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg" },
  //   {name: "Black Forest", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
  //   {name: "Hill Range", image: "https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg"},
  //   {name: "Toconos", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg" },
  //   {name: "Black Forest", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
  //   {name: "Hill Range", image: "https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg"}
  // ];

app.get("/", function(req, res) {
  res.render("landing");
});


app.get("/campgrounds", function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("index",{ campgrounds: allCampgrounds });    
    }
  });
});

app.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampgrounds = {name:name, image:image, description: description};
  Campground.create(newCampgrounds,function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");    
    }
  });
  // campgrounds.push(newCampgrounds);
});

app.get("/campgrounds/new",function(req,res){
  res.render("new.ejs");
});

//show
app.get("/campgrounds/:id",function(req,res){
  //res.send("This will be the snow page in future!");
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      console.log(foundCampground);
      res.render("show",{campground: foundCampground});
    }
  })
  
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Yelp camp server started at port 3000");
});