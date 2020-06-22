import express from "express";
import mongodb from "mongodb";
import cors from "cors";

const router = express.Router();

const validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Title filed can't be blank";
    return errors;
};

router.options("*", cors());


router.get("/", (req, res) => {
    console.log("response All Tasks");
    const db = req.app.get("db");
    db.collection("tasks")
        .find({})
        .toArray((err, tasks) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({tasks});
        });
});

// router.get("/:_id", (req, res) => {
//     const db = req.app.get("db");
//     db.collection("tasks").findOne(
//         { _id: new mongodb.ObjectId(req.params._id) },
//         (err, film) => {
//             if (err) {
//                 res.status(500).json({ errors: { global: err } });
//                 return;
//             }
//             res.setHeader('Access-Control-Allow-Origin', '*');
//             res.json({ film });
//         }
//     );
// });

router.post("/", (req, res) => {
    console.log(req.body);
    const db = req.app.get("db");
    const errors = validate(req.body);

    if (Object.keys(errors).length === 0) {
        db.collection("tasks").insertOne(req.body, (err, r) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            console.log(r.ops[0]);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({task: r.ops[0]});
        });
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(400).json({errors});
    }
});

router.put("/:_id", (req, res) => {
    const db = req.app.get("db");
    const { _id, ...taskData } = req.body.task;

    db.collection("tasks").findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: taskData },
        { returnOriginal: false },
        (err, r) => {
            if (err) {
                res.status(500).json({ errors: { global: err } });
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({ task: r.value });
            console.log(r.value);
        });
});

router.delete("/:_id", (req, res) => {
    const db = req.app.get("db");
    console.log(req.params);
    console.log(req.params._id);
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