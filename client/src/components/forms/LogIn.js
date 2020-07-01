import React, {useState} from "react"
import {Link} from "react-router-dom"
import FormMessage from "./FormMessage";
import api from "../../api";

const LogIn = (props) => {
    const initialData = {
        email: "",
        password: "",
    };

    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        console.log(e.target.name);
        setData({
            ...data, [e.target.name]: e.target.value
        });

        setErrors({
            ...errors, [e.target.name]: ""
        })
    };

    const hendleSubmit = e => {
        e.preventDefault();
        const errors = validate(data);
        setErrors(errors);
        if(Object.keys(errors).length === 0) {
            setLoading(true);
            console.log("=============== valid");
            api.users.login(data)
                .then(token => {
                    setLoading(false);
                    setData(initialData);
                    props.login(token);
                    props.history.push("/tasks");
                })
                .catch(err => {
                    setErrors({password: err.response.data.errors.global});
                    setLoading(false);
                })
        }
    };

    const validate = data => {
        const errors = {};

        if (!data.email) errors.email = "Email cannot be blank";
        if (!data.password) errors.password = "Password cannot be blank";

        return errors;
    };

    return (<form onSubmit={hendleSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input
                    type="email"
                    className={errors.email ? "form-control form-control-error" : "form-control"}
                    id="inputEmail"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                />
                <FormMessage>{errors.email}</FormMessage>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword1">Password</label>
                <input
                    type="password"
                    className={errors.password ? "form-control-error form-control" : "form-control"}
                    id="inputPassword1"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    name="password"
                />
                <FormMessage>{errors.password}</FormMessage>
            </div>
            <button type="submit" className="btn btn-primary">LogIn</button>
            <Link className="btn btn-secondary" to="/SignUp">Registration</Link>
        </form>
    )
};

export default LogIn;