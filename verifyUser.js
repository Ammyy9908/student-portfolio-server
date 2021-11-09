const jwt = require('jsonwebtoken')


async function verifyUser(req,res,next){
    const token = req.headers.authorization;

    if(!token){
       return  res.status(400).send({error:"Authentication token require!"});
    }

    try{
        const isValid = await jwt.verify(token,"mytopsecret");
        if(!isValid){
            return res.status(401).send({error:"Invalid Access token!"});
        }

        //else pass

        req.user = isValid;
        next();
    }
    catch(e){
        console.log("Error in verifying token");
    }
}

module.exports = verifyUser;