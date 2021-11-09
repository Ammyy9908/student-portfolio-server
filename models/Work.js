const {model,Schema} = require('mongoose')

const work_schema = new Schema({
    title:{
        type:"String",
        required:true
    },
    description:{
        type:"String",
        default:null
    },
    url:{
        type:"String",
        required:true
    },
    thumb:{
        type:"String",
        required:true
    },
    upload_by:{
        type:"String",
        required:true
    }
})

const Work = model('work',work_schema);

module.exports = Work;