import axios from 'axios';
import { useEffect } from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




const NavBar = ()=>{

    const navigate = useNavigate();

const onClickHandler =(e) => {
    axios.post('http://localhost:8000/devs/logout',{},{withCredentials:true})
    .then(res=>{
        navigate("/")
    })
    .catch(err=>console.log(err));
}

    return(
        <div className="navbar">
            <div className="navbar2">
                <h1>DevsOnDev</h1>
            </div>
            <div className="navbar3">
                <Button variant="outline-light" onClick={onClickHandler}>Logout</Button>
            </div>
        </div>
    )
}

export default NavBar