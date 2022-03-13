require('dotenv').config()
const express = require ("express"); 
let { loggerInfo } = require('./utils/logs');

const PORT = process.env.PORT;

const app = express(); 


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use('/product', require('./routes/productRouter'));

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error in app')
})


app.listen(PORT, () => {
    loggerInfo.info(`Server on http://localhost:${PORT} || PID: ${process.pid}`);
});



module.exports = app;
