import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Year({ year, setYear, setInYear, setIsFinished }) {

    //button handler
    const buttonRef = useRef();
    const checkList = useRef();
    const handleYear = (e) => !year.includes(e.target.id) ? setYear([...year, e.target.id]) : setYear(year.filter(el => el !== e.target.id))

    useEffect(() => {
        ((year.length > 0 && year.length <= 2) || year.includes('all')) ? buttonRef.current.disabled = false : buttonRef.current.disabled = true;
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
        setYear(['all'])
    }

    return (
        <div className='quiz'>
                <h1>How old/recent do you <br/> want the movie to be?</h1>
                <Form className='form-style'>
                    <Form.Group ref={checkList}>
                        <Form.Check type='checkbox' label='2015-2020' id='2015,2020' onChange={handleYear}></Form.Check>
                        <Form.Check type='checkbox' label='2010-2014' id='2010,2014' onChange={handleYear}></Form.Check>
                        <Form.Check type='checkbox' label='2005-2009' id='2005,2009' onChange={handleYear}></Form.Check>
                        <Form.Check type='checkbox' label='2000-2004' id='2000,2004' onChange={handleYear}></Form.Check>
                        <Form.Check type='checkbox' label='Before 2000!' id='2000' onChange={handleYear}></Form.Check>
                    </Form.Group>
                    <FormGroup>
                        <Form.Check type='checkbox' label="I don't mind!" id='all' onChange={allCheck}></Form.Check>
                    </FormGroup>
                    </Form>
                    <button className='btn' type='submit' ref={buttonRef} onClick={() => {
                        setInYear(false)
                        setIsFinished(true)
                    }}>Next</button>
        </div>
    );
}

export default Year;