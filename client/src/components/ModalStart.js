import React, { useState } from 'react';
import ReactDom from 'react-dom'
import '../styles.css'
import uuid from 'react-uuid'
import { socket } from '../contexts/socket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ModalStart({ setRoomModal, setIsStarting, setInGenre }) {
    const [code, setCode] = useState('')
    const [newCode, setNewCode] = useState('')
    const [error, setError] = useState('')

    const createCode = () => {
        setNewCode(uuid());
        console.log(newCode)
    }


    const MODAL_STYLE = {
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
        width: '450px',
        top: '50%',
        left: '50%',
        backgroundColor: 'rgb(212,195,170)',
        opacity: '1 !important',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4%',
        alignItems: 'center',
        padding: '10px 80px',
        position: 'fixed'
    }
    console.log(code)

    const handleClick = () => {
        if (code) {
            socket.emit('room', code)
            setError('')
            setCode('')
            setNewCode('')
            setRoomModal(false)
            setIsStarting(false);
            setInGenre(true)
        }
        else {
            setError('you must enter a valid code')
        }
    }

    const keyPressEvent = (e) => {
        if ((e.which || e.charCode || e.keyCode) === 13) { handleClick() }

    }

    return ReactDom.createPortal(
        <>
            <div className='overlay' />
            <div style={MODAL_STYLE}>
                <FontAwesomeIcon icon='times-circle' className='mdl-close' onClick={() => setRoomModal(false)} />
                <label>Enter your code</label>
                <input onChange={(e) => setCode(e.target.value)} value={code} type='text' id='room' onKeyPress={keyPressEvent}></input>
                <button className='btn' onClick={handleClick}> Enter </button>
                <button className='btn' onClick={createCode}>I need a code</button>
                <p>{newCode}</p>
                <p className='error'>{error}</p>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default ModalStart;