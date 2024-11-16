const express = require("express");
const mongoose= require("mongoose");
const app = express();
const path = require("path");
var methodOverride = require('method-override')
const chat=require("./models/chat.js");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(res=>{console.log("connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.get("/chats",async (req,res)=>{
    let chats = await chat.find()
    res.render("chats.ejs",{chats});
});

app.get("/newChat",(req,res)=>{
  res.render("newChat.ejs");
});

app.post("/chat",(req,res)=>{
  let {from,to,msg}=req.body;
  let newChat=new chat({
    from:from,to:to,msg:msg,created_at:new Date()}
  );
  newChat.save().then(
    result=>{
      res.redirect("/chats");
    }
  ).catch(err=>{
    console.log(err);
  });
});

app.get("/chat/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let data = await chat.findById(id);
    res.render("edit.ejs",{data});
});

app.post("/chat/:id",async (req,res)=>{
  let {id}=req.params;
  let updatedChat = await chat.findByIdAndUpdate(id,{
    from:req.body.from,
    to:req.body.to,
    msg:req.body.msg
  },{
    runValidator:true
  });
  res.redirect("/chats");
});

app.delete("/chat/:id",async (req,res)=>{
  let {id} = req.params;
  let deletedChat = await chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen("8080",(req,res)=>{
    console.log("server running on 8080");
});