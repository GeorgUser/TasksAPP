import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from "cors";

const router = express.Router();

router.options("*", cors());

router.post('/', (req, res) => {
    const { email, password } = req.body.credentials;
    const db = req.app.get('db');

    console.log(req.body.credentials);

    db.collection('users').findOne({ email }, (err, doc) => {
        if (err) {
            res.status(500).json({ errors: { global: err } });
            res.setHeader('Access-Control-Allow-Origin', '*');
            return;
        }

        if (doc) {
            if (bcrypt.compareSync(password, doc.password)) {
                console.log("accessible");
                const token = jwt.sign({ user: { _id: doc._id, email: doc.email } }, process.env.JWT_SECRET);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({ token });
            } else {
                console.log("access denied");
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(401).json({ errors: { global: 'Invalid credentials ' } });
            }
        } else {
            console.log("access denied");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(401).json({ errors: { global: 'Invalid credentials ' } });
        }
    });
});

export default router;