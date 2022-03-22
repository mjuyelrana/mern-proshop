import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/UserActions';
import { FormContainer, Loader, Message } from '../components';

const RegisterScreen = ({location, history}) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(()=>{
        if (userInfo) {
            history.push(redirect);
        }
    },[history, userInfo, redirect]);

    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password do not match!');
        }else{
            dispatch(register(name,email,password));
        }
        
    }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {error && <Message variant='danger'>{error}</Message>}

      {message && <Message variant='danger'>{message}</Message>}

      {loading && <Loader/>}

     <Form onSubmit={submitHandler}>

         <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control 
             type='text' 
             placeholder='Enter Name'
             value={name}
             onChange={(e)=>setName(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control 
             type='email' 
             placeholder='Enter Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='password'>
             <Form.Label>Password</Form.Label>
             <Form.Control 
             type='password' 
             placeholder='Enter Password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='confirmPassword'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control 
             type='password' 
             placeholder='Confirm Password'
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}/>
         </Form.Group>

         <Button type='submit' variant='primary' className='mt-3'>
             Register
         </Button>
     </Form>

    <Row className='py-3'>
        <Col>
         Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
    </Row>

    </FormContainer>
  )
}

export default RegisterScreen;