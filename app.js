//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hi there!! This is Aayushi Vishnoi. This is my Blog Website so in this home page, let me introduce you to myself. I am a girl from a country which is known for its heritage and culture you guys might have guessed it by now. Weather it's festivals or religions, my country is full of suprises. There are 22 Langugaes spoken here so that must be incredible right? so yeah you've guessed it right its INDIA. Being an Indian I know the values of heritage and culture. My motive through out the life will be promoting our rich culture. Well that's enough about my country let's talk about what do I actually do. I am a singer since my childhood I love to sing and not just this Ive also represented my district in National Youth India Award (Luckhnow) and have done many stage shows. This can be considered as my one of talent apart from it I am a tech Enthusiast who is litrelly into these new technologies and how they are making our daily life so easy. Being an Enginner i feel its my duty to serve the human mankind with the best  I can offer by my skills.";   
const aboutContent = "Aeons ago, there lived a king named Ugrasena. He had two children a son named Kamsa and a daughter named Devaki. Devaki was a good-natured person, but Kamsa had an evil mind. When he grew up, he dethroned his father and put him in jail. Meanwhile, his sister Devaki married king Vasudeva. As Kamsa was escorting his sister to her in-laws’ place, a voice rang out from the skies “The eighth son of your sister will grow up to kill you.” Kamsa wanted to put his sister to death to save his life. But Vasudeva begged Kamsa to spare his wife. He promised that he would hand over every child of theirs. Kamsa was pacified and put the couple behind bars. Moral – You should never disrespect her parents.";
const contactContent = "Let's Start an conversation. As an avid coffee drinker, I can deeply relate to this particular header. Aside from that, this is a friendly and inviting message that gets right to the point for the visitor. It shows where the company is located on one side of the page, as well as how you can contact them on the other side of the page.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
