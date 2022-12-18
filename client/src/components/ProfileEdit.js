import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Form, Card, Button} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";


const ProfileEdit = (props) => {
  
  const {setUser_id} = props;
  const [aboutMe, setAboutMe] = useState("");
  const [techs, setTechs] = useState([]);
  const [addTechs, setAddTechs] = useState([]);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
  
    e.preventDefault();
  
    axios.put('http://localhost:8000/devs/profile',{
      aboutMe,
      tech:addTechs,
    },{withCredentials: true})
      .then(res=>{
        console.log(res);
        console.log("res data", res.data);
        setAboutMe("");
        setAddTechs([]);
        navigate("/devs/dashboard")
      })
      .catch(err=>console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:8000/devs/techs', {withCredentials:true})
      .then((res) => {
        console.log("string",res.data);
        setTechs(res.data)
      })
      .catch( err => console.log(err) );
      axios.get('http://localhost:8000/devs/profile',{withCredentials: true})
      .then((res) => {
      console.log('profile',res);
      setAboutMe(res.data.aboutMe);
      setAddTechs(res.data.tech.map(tech=>tech._id));
      })
      .catch( err => console.log(err) );
  }, []);

  const onChangeHandler = (e) => {
    if (!addTechs.includes(e.target.dataset.obj_id)){
      setAddTechs(prevTechs=>[...prevTechs,e.target.dataset.obj_id])
    }
    else{
      console.log(e.target.dataset.obj_id)
      const newTechs = addTechs.filter(tech=>tech !== e.target.dataset.obj_id);
      console.log(newTechs)
      setAddTechs(newTechs);
    }
  }

  return (
    <div className="main">
      <Form onSubmit={onSubmitHandler} >
        <div className="aboutMe">
          <Form.Group className="aboutMe2">
            <Form.Label className="me">About Me</Form.Label>
            <Form.Control as="textarea" rows={3} className="aboutMe2" value={aboutMe} onChange={(e)=>setAboutMe(e.target.value)}/>
          </Form.Group>
        </div>
        <Form.Group>
          <Form.Label className="me">Languages</Form.Label>
          <div className="cards">
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
                  <Form.Group controlId="formBasicCheckbox" className="checkbox">
                    <Form.Check type="checkbox" data-obj_id={tech._id} checked={addTechs.includes(tech._id)} value={addTechs.includes(tech._id)} onChange={onChangeHandler}/>
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="buttons">
          <Button as="input" type="submit" variant="outline-light" value="Submit" />
        </Form.Group>
      </Form>
    </div>
  )
}

export default ProfileEdit