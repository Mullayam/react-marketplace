const jwt = require('jsonwebtoken');
module.exports  = (req,res,next) =>{
    try {
        // get token from headers
        const AuthToken = req.get('Authorization');
        
        if(typeof AuthToken === 'undefined'){
            throw new Error("Invalid Auth Token")
        }
        const token = AuthToken.split(" ")[1]
       
        const DecryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = DecryptToken._id
        next()
    } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
    }

}