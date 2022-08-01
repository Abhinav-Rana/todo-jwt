const config = require('config')    
const cors = require('cors')         
const express = require('express')  
const mongoose = require('mongoose') 

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || config.get("mongoURI")
const port = process.env.PORT || config.get("port");

// create Express app
const app = express();

// use essential middleware 
app.use(express.json());
app.use(cors())

app.use('/todo', require('./routes/todo'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/', (req,res)=> {res.send('Try /todo')})

// Connect to data store
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

  // start listening & inform user
app.listen(port, () =>{
   console.log(`App running on ${port} in ${environment}.`)
})