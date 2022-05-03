const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv").load(); //Use the .env file to load the variables
const sensorRouter = require("./routes/sensorRoutes");
const telemetryRouter = require("./routes/telemetryRoutes");
const userRouter = require("./routes/userRoutes");
const statsRouter = require('./routes/statsRoutes');
const gatewayRouter = require('./routes/gatewayRoutes');

//Instantiate the express instance

const app = express();

//Middleware
app.use(helmet()); //lets start by adding some basic security
app.use(cors()); //allow cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(passport.initialize());

//Connect to Mongo DB
mongoose.Promise = global.Promise; //Make the global promise equal to the mongoose promise

mongoose
  .connect(
    process.env.MONGO_CONNSTR,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
      }
    }
  )
  .then(() => console.log("Connection to MongoDB Successful"))
  .catch(err => console.error(err));

//Connecting to Azure's Cosmos DB
// mongoose
//   .connect(
//     process.env.COSMOSDB_CONNSTR + "?ssl=true&replicaSet=globaldb",
//     {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       auth: {
//         user: process.env.COSMODDB_USER,
//         password: process.env.COSMOSDB_PASSWORD
//       }
//     }
//   )
//   .then(() => console.log("Connection to CosmosDB successful"))
//   .catch(err => console.error(err));

//Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/sensors", sensorRouter);
app.use("/api/v1/telemetry", telemetryRouter);
app.use('/api/v1/stats',statsRouter);
app.use('/api/v1/gateways',gatewayRouter);

//Error 404 handling

app.use((req, res) => {
  res.status(404).json({ message: "Resource requested in unaivailable" });
});

//Listen to requests
PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
