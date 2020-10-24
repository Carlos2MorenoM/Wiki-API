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

/////////////////Request Targetting All Articles/////////////////////////

app.route("/articles")

.get(function(req,res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles)
        } else {
            res.send(err);
        }
    })
})

.post(function(req,res){
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article")
        }else {
            res.send(err);
        }
    });
})

.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles") 
        } else {
            res.send(err);
        }
    })
});

/////////////////Request Targetting a Specific Article/////////////////////////

app.route("/articles/")

//TODO


app.listen(3000, function() {
    console.log("Server started on port 3000")
});
