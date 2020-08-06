import React, {useState} from "react"
import {Link} from "react-router-dom"
import FormMessage from "./FormMessage";
import api from "../../api";
import Spinner from "../Spinner";

const SignUp = ({history}) => {
    const initialData = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.name);
        setData({
            ...data, [e.target.name]: e.target.value
        })
        setErrors({
            ...errors, [e.target.name]: ""
        })
    };

    const hendleSubmit = e => {
        e.preventDefault();
        const errors = validate(data);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            console.log("=============== valid");
            api.users.create(data).then(res => {
                setLoading(false);
                history.push('/');
                console.log(res)
            }).catch(err => console.log(err.response.data.errors))
        }
    };

    const validate = data => {
        const errors = {};

        if (!data.email) errors.email = "Email cannot be blank";
        if (!data.password) errors.password = "Password cannot be blank";
        if (!data.confirmPassword) errors.confirmPassword = "Confirm password cannot be blank";
        if (data.confirmPassword && data.password !== data.confirmPassword) errors.confirmPassword = "Password is different";

        return errors;
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={hendleSubmit}>
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
                <div className="form-group">
                    <label htmlFor="inputPassword2">Confirm password</label>
                    <input
                        type="password"
                        className={errors.confirmPassword ? "form-control-error form-control" : "form-control"}
                        id="inputPassword2"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleChange}
                    />
                    <FormMessage>{errors.confirmPassword}</FormMessage>
                </div>
                {loading ? (<Spinner/>) : (<button type="submit" className="btn btn-primary">SignUp</button>)}
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </form>
        </>
    )
};

export default SignUp;
