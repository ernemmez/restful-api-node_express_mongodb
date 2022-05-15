const express = require('express');
const authRouter = require('./routes/adminRouter');
const router = require('./routes/userRouter'); // import the router
const mongoose = require('mongoose');
require('dotenv').config(); // import the dotenv
const bodyParser = require('body-parser'); // import body-parser
const verifyToken = require('./middleware/verifyToken'); // import verifyToken

const app = express(); // create an instance of express


app.use(bodyParser.json()); // use body-parser


// connect to mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@your.wbvht.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,  
        (err) => {
            if (err) { // if error connecting to db
                console.log('Failed to Connect to Database ! ❌  Error :  ' + err);
            } else { // if connected to db
                console.log('Connected to MongoDB ✅');
            }
        }
)





router.get('/', (req, res) => { // default route
    res.sendFile('./public/', { root: __dirname });
})

app.use('/auth',authRouter) // use the auth router
app.use('/users', verifyToken, router); // use the router and verifyToken middleware




app.listen(2323,() => { // listen on port 2323
    console.log('Server is running on port 2323...');
})

