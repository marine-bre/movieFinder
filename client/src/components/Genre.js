import React, { useRef, useEffect, useState } from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const Genre = ({ genres, setGenres, setInDuration, setInGenre }) => {

    const buttonRef = useRef();
    const checkList = useRef();

    const handleCheck = (e) => {
        !genres.includes(e.target.id) ? setGenres([...genres, e.target.id]) : setGenres(genres.filter(el => el !== e.target.id))
    }
    console.log(genres)

    const allCheck = (e) => {
        if (e.target.checked === true) {
            for (let j = 0; j < checkList.current.childNodes.length; j++) {
                checkList.current.childNodes[j].childNodes[0].checked = false;
                checkList.current.childNodes[j].childNodes[0].disabled = true;
            }
            setGenres(['all'])

        }
        if (e.target.checked === false) {
            for (let j = 0; j < checkList.current.childNodes.length; j++) {
                checkList.current.childNodes[j].childNodes[0].disabled = false;
            }
            setGenres([])
        }
    }

    useEffect(() => {
        (genres.length >= 4 || genres.includes('all')) ? buttonRef.current.disabled = false : buttonRef.current.disabled = true
    })

    const arrNum = [28, 12, 14, 878, 18, 9648, 10752, 10749, 35, 27, 36, 16, 53, 80, 99, 10751]
    const arrName = ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Drama', 'Mystery', 'War', 'Romance', 'Comedy', 'Horror', 'History', 'Animation', 'Thriller', 'Crime', 'Documentary', 'Family']

    return (
        <div className='quiz'>
            <h1>Choose at least 4 <br/>categories of movies</h1>
            <Form className='form-style'>
                <Form.Group ref={checkList}>
                    {arrNum.map((el, i) => <Form.Check type='checkbox' key={el} label={arrName[i]} id={el} onChange={handleCheck}></Form.Check>)}
                </Form.Group>
                <FormGroup>
                    <Form.Check type='checkbox' label="I don't mind!" id='all' onChange={allCheck}></Form.Check>
                </FormGroup>
            </Form>

            <button className='btn' type='submit' ref={buttonRef} onClick={() => {
                setInGenre(false); setInDuration(true)
            }}>Next</button>
        </div>
    )
}

export default Genre;