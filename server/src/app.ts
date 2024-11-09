
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';


import { errorHandler, NotFoundError } from '@vb430/common';
import { CurrentUserRouter } from "./routes/current-user";
import { SignInRouter } from "./routes/signin";
import { SignOutRouter } from "./routes/signout";
import { SignUpRouter } from "./routes/signup";



const app = express()
app.set('trust proxy',true)

app.use(express.json())

app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !== 'test'
    })
)

app.use(SignInRouter)
app.use(SignOutRouter)
app.use(SignUpRouter)
app.use(CurrentUserRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


//error handler should be used in end after all the usage of routes else error handler wont work
app.use(errorHandler)


export { app };
