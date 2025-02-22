const express = require('express');
const app = express();
const cors = require('cors')
const port = 8090;


const connection = require('./db');
connection();

app.use(express.json());
app.use(cors())

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const cartRouter = require('./routes/cartRoutes');

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/carts',cartRouter);


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})