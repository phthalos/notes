//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
import express from "express";
import dotenv from "dotenv";
const app = express();
import ConnectDB from "./database/ConnectDB";
import router from "./routes/DBOperRoutes";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
//using the port in environmental variable or 5000
const port = process.env.PORT || 5000;

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// initialize the database connection pool
let pool;

(async () => {
    pool = await ConnectDB();

    // pass the pool to the routes
    app.use((req, res, next) => {
        req.pool = pool;
        next();
    });

    // use the router
    app.use("/", router);

    // start the server
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
})();
