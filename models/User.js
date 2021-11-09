const {model,Schema} = require('mongoose')


const user_schema = new Schema({
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    }
    ,
    avatar:{
        type:"String",
        default:null
    },
    id:{
        type:"String",
        required:true
    },
    website:{
        type:"Object",
        default:null
    },
    github:{
        type:"String",
        default:null
    },
    Bio:{
        type:"String",
        default:"404 Not found"
    }
})

const User = model('user',user_schema);

module.exports = User;