import React, { useState } from 'react'
// import { loginUserApi } from '../apis/user-api';
import isEmail from "validator/lib/isEmail";
import { loginUser } from '../utils/LoginUtil';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const credentialsValidator = ({ email, password }) => {
        if (isEmail(email) && password?.length >= 8) {
            return true;
        }
        return false;
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!credentialsValidator(credentials)) {
                return;
            }
            await loginUser({ ...credentials });
            navigate("/to-do");
        } catch (err) {
            console.error(`Invalid Credentials`);
        }
    };

    return (
        <div className="screen">
            <h1 className="ui heading center">Login</h1>
            <div>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={credentials.email} />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" minLength={8} onChange={handleChange} value={credentials.password} />
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
