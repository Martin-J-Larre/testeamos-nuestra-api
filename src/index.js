const express = require ("express"); 
const compression = require('compression')
require('dotenv').config()
const serverRoutes = require("./routes/index");
let { loggerInfo } = require('./utils/logs');

const PORT = process.env.PORT;

const app = express(); 
app.use(compression())


//--------------Cluster

let cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const modoCluster = process.argv[2] == 'CLUSTER'

// Master/Primary
if (modoCluster && cluster.isMaster) {
    loggerInfo.info(`Master ${process.pid} is running`);

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) =>
        loggerInfo.info(`Worker ${worker.process.pid} died`)
    );
} else {


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs"); 
app.set("views", "./src/public"); 
app.use(express.static("./public")); 

serverRoutes(app);

app.listen(PORT, () => {
    loggerInfo.info(`Server on http://localhost:${PORT} || PID: ${process.pid}`);
});

}

module.exports = app;
