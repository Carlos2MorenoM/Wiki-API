const express = require("express");
const mongoose = require("mongoose");
const ejs = require ("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true
}));
app.use (express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useUnifiedTopology: true, useNewUrlParser: true});

// SCHEMA
const articleSchema = {
    title: String,
    content: String
};

// MODEL
const Article = mongoose.model("Article", articleSchema);

//GET METHOD

app.get("/articles", function(req,res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles)
        } else {
            res.send(err);
        }
    })
});

//POST METHOD

app.post("/articles", function(req,res){
    console.log(req.body.title)
    console.log(req.body.content)
});



app.listen(3000, function() {
    console.log("Server started on port 3000")
});