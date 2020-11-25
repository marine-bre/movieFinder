import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { socketListen } from '../contexts/socket'
 
function Duration({duration, setDuration, setInDuration, setInYear}) {

    const buttonRef = useRef();
    const checkList = useRef();

    const handleDuration = (e) => !duration.includes(e.target.id) ? setDuration([...duration, e.target.id]) : setDuration(duration.filter(el => el !== e.target.id))
    
    useEffect(() => {
        ((duration.length > 0 && duration.length <= 2) || duration.includes('all')) ? buttonRef.current.disabled = false : buttonRef.current.disabled = true;
        console.log(duration)
    })

    const allCheck = (e) => {
        if (e.target.checked === true) {
            for (let j = 0; j < checkList.current.childNodes.length; j++) {
                checkList.current.childNodes[j].childNodes[0].checked = false;
                checkList.current.childNodes[j].childNodes[0].disabled = true;
            }
        }
        if (e.target.checked === false) {
            for (let j = 0; j < checkList.current.childNodes.length; j++) {
                checkList.current.childNodes[j].childNodes[0].disabled = false;
            }
        }
        setDuration(['all'])
    }


    return (
        <div className='quiz'>
                <h1>How long do you want <br/> the movie to be?</h1>
                <Form className='form-style'>
                    <Form.Group ref={checkList}>
                        <Form.Check type='checkbox' label='More than 2.5 hours!' id='150' onChange={handleDuration}></Form.Check>
                        <Form.Check type='checkbox' label='Between 2 and 2.5 hours' id='120,150' onChange={handleDuration}></Form.Check>
                        <Form.Check type='checkbox' label='Between 1.5 and 2 hours' id='90,120' onChange={handleDuration}></Form.Check>
                        <Form.Check type='checkbox' label='Less than 1.5 hours' id='90' onChange={handleDuration}></Form.Check>
                    </Form.Group>
                    <FormGroup>
                    <Form.Check type='checkbox' label="I don't mind!" id='all' onChange={allCheck}></Form.Check>
                    </FormGroup>
                    </Form>
                        <button className='btn'  type='submit' ref={buttonRef} onClick={() => {
                        setInDuration(false);
                        setInYear(true)
                        }
                        }>Next</button>
        </div>
    );
}

export default Duration;