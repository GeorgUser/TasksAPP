import express from 'express';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import cors from "cors";

const router = express.Router();

function validate(user, db, cb) {
    const errors = {};

    db.collection('users').findOne({email: user.email}, (err, doc) => {
        if (err) return {isValid: false, errors: {global: `Database error ${err}`}};

        if (doc) errors.email = 'User with such email already exists';
        if (!user.email) errors.email = "Can't be blank";
        if (!isEmail(user.email)) errors.email = 'Invalid email address';
        if (!user.password) errors.password = "Can't be blank";
        if (user.password !== user.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }

        return cb({
            isValid: Object.keys(errors).length === 0,
            errors
        });
    });
}

router.options("*", cors());

router.post('/', (req, res) => {
    console.log(req.body);
    const user = {
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10),
    };
    console.log(user);
    const db = req.app.get('db');

    validate(req.body.user, db, ({isValid, errors}) => {
        if (!isValid) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(400).json({errors});
        } else {
            db.collection('users').insertOne(user, err => {
                if (err) {
                    res.status(500).json({errors: {global: err}});
                    return;
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json("Create user confirmed");
            });
        }
    });
});

export default router;