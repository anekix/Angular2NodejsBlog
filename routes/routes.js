var fs = require("fs");
var mongoose = require('mongoose');
var Posts = require('../models/posts');
var Admin = require('../models/admin');

var appRouter = function(app) {

//this is an example of a middleware that is called for every request to the app
//NOte this middleware works at the application level ,note `app.use() method` ,
// it means at application level
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});



/*``````````````````````````````````````````````````````````````````````````````````````````````````
*for dashboard every api call must be authenticated
*API's:
* 1) To ADD posts to DB
* 2) To REMOVE posts from DB
* 3) To Update posts from DB
* 4) To List posts from DB
````````````````````````````````````````````````````````````````````````````````````````````````````*/


app.post('/addpost',function(req,res){
  var posts = new Posts();
  // Set the posts properties that came from the POST data
  if(!req.body.id || !req.body.title || !req.body.body){
    res.json({summary:'missing parameter'})
  }
  else{
  posts.id = req.body.id;
  posts.title = req.body.title;
  posts.body = req.body.body;

  posts.save(function(err) {
    if (err)
      res.send(err);
    res.json({ summary: 'posts added to database!', data: posts });
  });
}
})

app.post('/login',function(req,res){
  if(!req.body.username|| !req.body.password){
    res.json({summary:'missing parameter'})
  }
  else{
    Admin.find({username:req.body.username,password:req.body.password},function(err,data){
    if (err) res.json({'summary':err});
      else{
          console.log(data);
          res.send(data);
      }
    });
  }
});

// app.get('/users',function(req,res){
// mongoose.model('users').find(function(err,users){
//   res.send(users);
//   })
// });

//if we want the middleware to limit to certain paths(routes)
// invoked for all  request starting with /users
app.use('/users', function(req, res, next) {
  console.log(req.path);
  next();
});
 
app.get('/users/daily', function(req, res, next) { 
// invoked for any request starting with /users
res.send('hi');
});


 app.get("/", function(req, res) {
    res.send("Hello World");
});
app.get("/account", function(req, res) {
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }


    //to check if username is present as query param or not use as below
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        //used to send a file (assuming dead.png is in same directory as this script)
        //to send a simple response object use `return res.send(accountMock);`
        //to set status use `res.status(code)`
        return res.status(200).send(accountMock);

    }
});

app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        return res.send(req.body);
    }
});



//Task1 - CREATE BASIC REST BASED CRUD API's
//1) API TO DISPLAY ALL THE USERS IN THE FILE (assuming the json file exist in the same directory)

app.get("/listusers",function(req,res){
    fs.readFile(__dirname+ "/"+"usersdata.json",'utf8',function(err,data){
        console.log(data);
        res.end(data);
    })

})

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}
//2) API TO ADD USER

app.post('/adduser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "usersdata.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
}
module.exports = appRouter;
