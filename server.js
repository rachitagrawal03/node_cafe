const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db.js');

const app = express();

dotenv.config();
app.use(express.json())

const PORT = process.env.PORT;
connectDB();

// middleware logger function
const logRequest = async (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
}

const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.get('/', (req,res)=>{
  res.send("welcome to our hotel");
})

app.listen(PORT, ()=>{
  console.log(`server running on port: http://localhost:${PORT}`);
})


