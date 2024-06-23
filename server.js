const express = require('express');
const authRouter=require('./router/authRouter')

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/userRouter', authRouter);

app.get('/',()=>{
    console.log('server running on root')
})
app.get('/home',()=>{
    console.log('server running on home')
})
app.listen(3000, () => {
      console.log(`server is running on ${3000}`);
    })