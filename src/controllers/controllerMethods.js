let {default: logger, loggerError, loggerInfo, loggerWarn} = require('../utils/logs');
const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));
const path = parseArgs(process.argv)._[1];
let os = require('os');
/////todo: Desactivar el child_process
let { fork } = require ("child_process");


class controllerMethods {
    
    async root( req, res) {
        loggerInfo.info(`Root: Path "${req.route.path}" Method "${req.route.stack[0].method}"`)
        res.send(`<h1 style="font-size: 1.5rem; 
                        text-align: center;
                        color: darkgoldenrod; 
                        margin-top: 1rem">
                        DESAFíO LOGGERS Y GZIP || ANALISIS COMPLETO DE PERFOMANCE
            </h1>
            `)
    }

    async getInfo(req, res) {
        loggerInfo.info(`Info: Path "${req.route.path}" Method "${req.route.stack[0].method}"`); 
        const data = {
                argv: JSON.stringify(args),
                os: process.platform,
                nodeVersion: process.version,
                rss: JSON.stringify(process.memoryUsage()),
                path: path,
                pid: process.pid,
                projectFolder: process.cwd(),
                Cpus: os.cpus().length,
        }
        try {
            res.render("./pages/index", data);
            // info path with and without console.log()
            console.log(data);
        } catch (error) {
            res.status(500).json({ error: "Error while getting messages.", description: error.message });
            logger.error("info",error)
        }

    }
    /////todo: Desactivar el child_process
    async getNumRandom(req, res){
        loggerInfo.info(`randoms: Path "${req.route.path}" Method "${req.route.stack[0].method}"`);
        try {
            const { cant = 100000000 } = req.params;
    
            const forked = fork("./src/utils/numberRandom.js");
    
            forked.on("message", (message) => {
                if (message == "ok") {
                    forked.send({ cant: cant });
                } else {
                    res.json({
                        numbers: JSON.stringify(message),
                        os: process.platform,
                        nodeVersion: process.version,
                        rss: JSON.stringify(process.memoryUsage()),
                        pid: process.pid,
                        projectFolder: process.cwd(),
                        Cpus: os.cpus().length,
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ error: "Error on messages.", description: error.message });
        }
    }
    async getError(req, res) {
        loggerError.error(`Error: Path "${req.route.path}" Method "${req.route.stack[0].method}"`);
        logger.error(`Error: Path "${req.route.path}" Method "${req.route.stack[0].method}"`);
        res.send(`<h1> Error in path: localhost:8081"${req.route.path}"</h1>`)
    }
    
    async getNotExist(req, res){
        loggerWarn.warn(`Warning: Path "${req.route.path}" Method "${req.route.stack[0].method}" not Exist, Path is not correct`);
        logger.warn(`Warning: Path "${req.route.path}" Method "${req.route.stack[0].method}" not Exist, Path is not correct`);
        res.send(`<h1> Error in path: localhost:8081"${req.route.path}" Not exist</h1>`)
    }
}

module.exports = new controllerMethods();