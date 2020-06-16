import express from "express";
import path from "path";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// https://server-georg.herokuapp.com/ | https://git.heroku.com/server-georg.git
import tasks from "./routes/tasks";


const app = express();

dotenv.config({
    path: path.join(__dirname, ".env")
});

const isDev = app.get("env") === "development";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/tasks", tasks);

app.use(express.static(path.join(__dirname,"data")));

app.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname + '/data/index.html'));
    console.log("Hello Test");
});

const port = process.env.PORT || 4000;
const mongoUrl = `${process.env.DB_CONNECTION}`;


mongodb.MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(client => {
        const db = client.db(process.env.DB_NAME);

        app.set("db", db);

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "./index.html"));
        });
        app.get("/api/test", (req, res) => {
            res.json({ mes: "Hello from express" });
        });
        app.listen(port, () => console.log(`Running on localhost:${port}`));
    })
    .catch(err => console.log("Error connect"));
