const mongoose = require("mongoose");

let chatSchema = mongoose.Schema({
    from : {
        type:String,
        required : true
    },
    to:{
        type : String,
        required : true
    },
    msg:{
        type : String,
        maxLength : 50
    },
    created_at:{
        type : Date,
        required : true
    }
});

let chat = mongoose.model("chat",chatSchema);

module.exports = chat;