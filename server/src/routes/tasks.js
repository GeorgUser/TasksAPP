import express from "express";
import mongodb from "mongodb";
import cors from "cors";
import authenticate from "../middlewares/authenticate";
import checkId from "../middlewares/checkId";

const router = express.Router();

const validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Title filed can't be blank";
    return errors;
};

router.options("*", cors());

router.get("/", authenticate, (req, res) => {
    console.log("Response all tasks");
    const db = req.app.get("db");
    db.collection("tasks")
        .find({userId: new mongodb.ObjectID(req.userId)})
        .toArray((err, tasks) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({tasks});
        });
});

router.post("/", authenticate, (req, res) => {
    const db = req.app.get("db");
    const errors = validate(req.body);

    if (Object.keys(errors).length === 0) {
        const task = {...req.body, userId: req.userId};
        db.collection("tasks").insertOne(task, (err, r) => {
            if (err) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500).json({errors: {global: err}});
                console.log(err);
                return;
            }
            console.log("Add new task", r.ops[0]);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({task: r.ops[0]});
        });
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(400).json({errors});
        console.log(errors);
    }
});

router.put("/:_id", authenticate, checkId, (req, res) => {
    const db = req.app.get("db");
    const {_id, userId, ...taskData} = req.body.task;

    db.collection("tasks").findOneAndUpdate(
        {_id: new mongodb.ObjectId(req.params._id)},
        {$set: taskData},
        {returnOriginal: false},
        (err, r) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({task: r.value});
            console.log("Change task", r.value);
        });
});

router.delete("/:_id", authenticate, (req, res) => {
    const db = req.app.get("db");
    console.log("Delete task", req.params._id);
    db.collection("tasks").deleteOne(
        {_id: new mongodb.ObjectId(req.params._id)},
        err => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({task: req.params});
        }
    );
});

export default router;