import express  from "express";

const route = express.Router();

route.get('/api/users/signout',(req,res)=>{
    req.session = null
    res.send({})

});

export {route as SignOutRouter};