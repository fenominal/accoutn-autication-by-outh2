const express=require('express');
const app=express();
require('dotenv').config();

// index.js

const { auth,requiresAuth } = require('express-openid-connect');

app.use(
  auth({
    authRequired:false,
    auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);


app.get('/',(req,res)=>{
    res.send(req.oidc.isAuthenticated()?'login':'logout');
    });


    app.get('/profile',requiresAuth(),(req,res)=>
{
res.send(JSON.stringfy(req.oidc.user));
}
);

const port=process.env.PORT ||3000
app.listen(port,()=>{
console.log('listen on 3000');
});
