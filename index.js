const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
app.use(cors())

app.use(express.json())
const User = require('./models/User')
const Work = require('./models/Work')
const port = process.env.PORT || 5000;
const verifyUser = require('./verifyUser')

// connect to db




mongoose.connect('mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/studentPortfolio').then(()=>{
    console.log(`Database connected`);
}).catch((e)=>{
    console.log(`Error in connecting db `,e.message);
})


app.post('/login',async (req,res)=>{
    const {_id,name,avatar,email} = req.body;

    // check is user already have account in db or not if make a token and send it to client

    const user = await User.findOne({id:_id});

    if(user){
        const token = await jwt.sign({id:user.id},"mytopsecret");
        return res.status(200).send({token:token});
    }

    // else make a new entry

    new User({
        id:_id,
        email,
        avatar,
        name
    }).save().then(async ()=>{
        const token = await jwt.sign({id:_id},"mytopsecret");
        res.status(200).send({token})
    })
})
.get('/user',verifyUser,async (req,res)=>{

    const {id} = req.user;

    // find the user with this id and hand over to client

    const user = await User.findOne({id:id});

    res.status(200).send({user});
})
.get('/public/:id',async (req,res)=>{

    const {id} = req.params;
    const user = await User.findOne({id:id});

    res.status(200).send({user:user});
})
.get('/works/:uid',async (req,res)=>{

    const works = await Work.find({upload_by:req.params.uid});

    res.status(200).send({works:works});
})
.post("/work/:id",async (req,res)=>{
    const {id} = req.params;

    

    console.log(req.body);

    const {title,description,url,thumb} = req.body;

    console.log(req.body)

    new Work({
        title,
        description,
        url,
        thumb,
        upload_by:id
    }).save().then(()=>{
        res.status(200).send({work:{
            title,
            description,
            url,
            thumb,
            upload_by:id
        }})
    })
})
.get('/works',async (req,res)=>{
    const works = await Work.find();

    res.status(200).send({works:works});
})

app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})