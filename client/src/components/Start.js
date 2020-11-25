import React, { useEffect, useState } from 'react';
import Genre from './Genre'
import Year from './Year'
import Duration from './Duration'
import Results from './Results'
import ModalStart from './ModalStart'
import { Button, Container, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketListen, socket } from '../contexts/socket'
import '../styles.css'


function Start() {
    const [isStarting, setIsStarting] = useState(true);
    const [inGenre, setInGenre] = useState(false);
    const [inYear, setInYear] = useState(false);
    const [inDuration, setInDuration] = useState(false);
    const [received, setReceived] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [roomModal, setRoomModal] = useState(false)

    const [genres, setGenres] = useState([]);
    const [duration, setDuration] = useState([])
    const [year, setYear] = useState([])

    const [preferences, setPreferences] = useState('')

  //sending own choices to server as soon as questionnaire is completed  
    useEffect(() => {
        if (isFinished === true) {
            socket.emit('preferences', { genres, duration, year })
        }
    }
        , [isFinished])

    return (
        <div className='home'>
            <div className='background-image' />
            <SocketListen setPreferences={setPreferences} preferences={preferences} received={received} setReceived={setReceived} />
            <Container fluid>
            {/* Starting block */}
                {isStarting &&
                    <div className='centered'>
                        <h1> What movie are we watching tonight?</h1>
                        <button className='btn' onClick={()=>{
                            setRoomModal(true)
                            }}>Start</button>
                    </div>
                }
                {roomModal && <ModalStart setRoomModal={setRoomModal} setInGenre={setInGenre} setIsStarting={setIsStarting}/>}
            {/* Genre block */}
                {inGenre && <Genre genres={genres} setGenres={setGenres} setInDuration={setInDuration} setInGenre={setInGenre} />}
            {/* Duration block */}
                {inDuration && <Duration duration={duration} setDuration={setDuration} setInYear={setInYear} setInDuration={setInDuration} />}
            {/* Release year block */}
                {inYear && <Year setYear={setYear} year={year} setInYear={setInYear} setIsFinished={setIsFinished} />}

            {/* Showing the results block only if other's preferences have been received */}
                {(preferences !== '' && isFinished) ? <Results genre={genres} durations={duration} years={year} preferences={preferences} /> :
                (preferences ==='' && isFinished)?
                    <div style={{ margin: '20% auto auto auto', width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Spinner animation="border" />
                        <h1 style={{ textAlign: 'center', fontSize: '1em', marginTop: '30px' }}>Waiting for the other player to complete the quiz</h1>
                    </div>:
                    <></>
                    }
            </Container>
        </div>
    );
}

export default Start;
