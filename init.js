const mongoose= require("mongoose");
const chat=require("./models/chat.js");

main().then(res=>{console.log("connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChat=[{
    from:"maulik",
    to:"Mr.nobody",
    msg:"yoooooooo who are you ?",
    created_at : new Date()
    },
    {
        from:"kuldeep",
        to:"maulik",
        msg:"Delete requrest sucks",
        created_at : new Date()
    },
    {
        from:"manav",
        to:"shyam",
        msg:"digital schollarship nu form bharu ?",
        created_at : new Date()
    },
    {
        from:"maulik",
        to:"akash",
        msg:"Levo Maro ?",
        created_at : new Date()
    }
];

chat.insertMany(allChat);

