const express = require("express");
const bodyparser = require("body-parser");

const _ = require("lodash");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todolistData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("views/public"));
app.set('view engine', 'ejs');

app.listen(5000, list);

function list() {
  console.log("Server is runnig on port:5000");
}

// -----------Global variables--------
var userName;
var user_Date;

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/login", function(req, res) {
  //action for login users
  userName = _.capitalize(req.body.username);
  res.redirect("/calender");
});

app.post("/signup", function(req, res) {
  //action to redirect to signup page
  res.render("signup");
});

// app.post("/create", function(req, res) {
//   //action to create a username
//   userName = _.capitalize(req.body.username);
//   res.redirect("/calender");
// });

app.get("/calender", function(req, res) {
  res.render("calender", {
    name_add: userName
  });
});

app.post("/cal_data", function(req, res) {
  user_Date = String(req.body.date);
  res.redirect("/to-do-list");
});

app.get("/to-do-list", function(req, res) {

item_model.find({username:userName, date:user_Date},function(err,data){
  // if(err)
  // console.log(err);
  // else
  // console.log(data);

  res.render("to-do", {
    use:userName,
    day: user_Date,
    value:data
  });
});
});
var a=0;
app.post("/store", function(req, res) {

  const item_value = req.body.items;
  const add_item = new item_model({
    item: item_value,
    username: userName,
    date: user_Date
  });
  add_item.save();
  if(a==0)
  setTimeout(function(){
    res.redirect("/to-do-list");
    a++;
  }, 300);
  else
  res.redirect("/to-do-list");
});

app.post("/del", function(req, res) {
  const del = req.body.checkbox;
  item_model.findByIdAndDelete(del, function(err) {
    // if (err)
    //   console.log(err);

    res.redirect("/to-do-list");
  })
});

// ---------------database section ------------


// --------------Schemas------------
const item_schema = new mongoose.Schema({
  item: String,
  username: String,
  date: String
});

// ------------Model----------
const item_model = new mongoose.model("item", item_schema);
