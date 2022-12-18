import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Form, Card, Button} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";


const Dashboard = (props) => {
    const [dev, setDev] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [techs, setTechs] = useState([]);
    const [userTechs, setUserTechs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/devs/profile',{withCredentials: true})
            .then((res) => {
            console.log('profile',res);
            setAboutMe(res.data.aboutMe);
            setTechs(res.data.tech);
            setDev(res.data.dev_id);
            })
            .catch( err => console.log(err) );
    }, []);

const deleteHandler = ()=>{
    axios.delete('http://localhost:8000/devs/profile', {withCredentials:true})
        .then((res) =>{
            console.log('Deleted', res)
            navigate('/devs/profile');
        })
        .catch(err => console.log(err));
}

    return (
    <div className="main">
        <div className="dashboard">
            <h1>Dashboard</h1>
        </div>
        <div className="dashbody">
            <div className="aboutMe">
                <div>
                    <h3>About Me</h3>
                </div>
                <div>
                <p>Name: {dev.firstName}{dev.lastName}</p>
                <p>Email: {dev.email}</p>
                <p>Address: {dev.address}</p>
                <p>City: {dev.city}</p>
                <p>State: {dev.state}</p>
                <p>About Me:</p>
                <p>{aboutMe}</p>
                </div>
            </div>
            <div className="cards1">
                <div>
                    <h3>Languages</h3>
                </div>
                {techs.map((tech, index) => (
                    <Card 
                    key={index}
                    className="card"
                    style={{width: "8rem"}}>
                        <Card.Body className="card-body">
                            <Card.Img
                            style={{width: "40px"}}
                            alt={tech.name}
                            src={tech.image}/>
                            <Card.Title className="card-title">
                            {tech.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
            <div className="buttons">
                <Button variant="outline-light" as="input" type="submit" value="Edit Profile" onClick={()=>navigate("/devs/profile/edit")}/>
                <Button variant="outline-light" as="input" type="submit" value="Delete Profile" onClick={deleteHandler}/>
            </div>
    </div>
    )
}

export default Dashboard