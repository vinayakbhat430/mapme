import { CurrentUser, requireAuth } from "@vb430/common";
import express from "express";

const route = express.Router();

route.get('/api/users/current-user', CurrentUser, requireAuth ,(req,res)=>{
    res.send({currentUser: req.currentUser || null})
});

export { route as CurrentUserRouter };
