import express from "express";
import path from "path";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import tasks from "./routes/tasks";
import users from "./routes/users";
import auth from "./routes/auth";


const app = express();

dotenv.config({
    path: path.join(__dirname, ".env")
});

const isDev = app.get("env") === "development";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);

app.use(express.static(path.join(__dirname, "data")));

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
    app.listen(port, () => console.log(`Running on localhost:${port}`));
})
    .catch(err => console.log("Error connect"));
