import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
const DevLogin = (props) => {

    const {devs, setDevs} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {

        e.preventDefault();

        axios.post('http://localhost:8000/devs/login', {
            email,
            password,
        },{withCredentials: true})
            .then(res=>{
                console.log(res);
                console.log(res.data);
                // setDevs([...devs, res.data]);
                setEmail("");
                setPassword("");
                navigate("/devs/dashboard");
            })
            .catch(err=>console.log(err))
    }
    
return (
<div>
    <div>
        <div>
            <div className="title">
                <h1>Welcome Back, Developer!</h1>
            </div>
            <div className="title">
                <h3>Let's Connect You To A Job!</h3>
            </div>
            <div className="class">
                <form onSubmit={onSubmitHandler}>
                    <div className="form">
                        <label>Email</label><br/>
                        <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Password</label><br/>
                        <input type="password" onChange = {(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="buttons">
                        <Button type="submit" variant="outline-light" className="">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
)
}
export default DevLogin;