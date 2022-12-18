import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap"; 

const DevSignUp = (props) => {

    const {devs, setDevs} = props;
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {

        e.preventDefault();

        axios.post('http://localhost:8000/devs/register', {
            firstName,
            lastName,
            email,
            address,
            city,
            state,
            password,
            confirmPassword,
        },{withCredentials: true})
            .then(res=>{
                console.log(res);
                console.log("res data",res.data);
                // setDevs([...devs, res.data]);
                setFirstName("");
                setLastName("");
                setEmail("");
                setAddress("");
                setCity(""); 
                setState("");
                setPassword("");
                setConfirmPassword("");
                navigate("/devs/profile");
                console.log("Navigating now");
            })
            .catch(err=>console.log(err))
    }
    
    return (
        <div>
            <div className="title">
                <h1>Developer Sign Up</h1>
            </div>
            <div className="class">
                <form className="form1" onSubmit={onSubmitHandler}>
                    <div className="form">
                        <label>First Name</label><br/>
                        <input type="text" onChange = {(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Last Name</label><br/>
                        <input type="text" onChange = {(e)=>setLastName(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Email</label><br/>
                        <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Address</label><br/>
                        <input type="text" onChange = {(e)=>setAddress(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>City</label><br/>
                        <input type="text" onChange = {(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>State</label><br/>
                        <input type="text" onChange = {(e)=>setState(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Password</label><br/>
                        <input type="password" onChange = {(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Confirm</label><br/>
                        <input type="password" onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="buttons">
                        <Button as="input" type="submit" variant="outline-light" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default DevSignUp;
