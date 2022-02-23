var jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to request object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try 
    {
        const data = jwt.verify(token, "sid");//verify the jwt token and if any error is there then catch will run
        req.user = data.user;
        next();//this will call next function which is in auth.js => async(req,res)=>{}
    }
    catch (error) 
    {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
module.exports = fetchuser;
