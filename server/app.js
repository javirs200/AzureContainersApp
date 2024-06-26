require('dotenv').config();
const http = require('http');
const helmet = require('helmet');
const express = require('express');
const error404 = require('./middleware/error404')
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

//utils
const socket = require('./utils/socket');
const server = http.createServer(app);
const io = socket(server);

//routers
const userRoutes = require('./routes/users.routes')
const loginRoutes = require('./routes/login.routes')
const carRoutes = require('./routes/cars.routes')
const participationsRoutes = require('./routes/participations.routes');
const eventRoutes = require('./routes/events.routes');

//DB conection Startup
const database = require('./config/db_pgsql')
database.connectSQL();

if(process.env.CORS_ORIGIN){
  app.use(cors({credentials: true,origin: process.env.CORS_ORIGIN}));
}else{
  app.use(cors({credentials: true,origin: 'http://localhost'}));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/users',userRoutes)

app.use('/api/cars',carRoutes)

app.use('/api/events',eventRoutes)

app.use('/api/participations',participationsRoutes)

app.use('/api/login',loginRoutes)

app.get('/api/hello',async (req, res) => {
  try {
    const response = req.ip
    if(response){
      res.status(200).json({ msj:"hello " + response + ", welcome"});
    }else{
      res.status(200).json({ msj:"hello from api , welcome"});
    }
    
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
});

app.use('/api/*',error404);

server.listen(port, () => {
    console.log(`listening on port:${port}`);
  });
  
module.exports = {app}