import React, { useState, useEffect } from 'react';
import Choices from './Card.js'
import { socket } from '../contexts/socket'
import Modal from './Modal.js'
import Thanks from './Thanks.js'

function Fetching({ url }) {

    const [showModal, setShowModal] = useState(false)

    //variables needed to register results from the api
    const allTitles = []
    const allPosterUrl = [];
    const allOverview = [];
    const allLanguage = [];

    const [index, setIndex] = useState(0);

    const [title, setTitle] = useState([]);
    const [posterUrl, setPosterUrl] = useState([]);
    const [overview, setOverview] = useState([]);
    const [language, setLanguage] = useState([]);

    const [showThanks, setShowThanks] = useState(false)

    //fetching function defined here that will be called later on
    const fetching = async () => {
        console.log(url)
        const data = await fetch(url)
        const response = await data.json()
        console.log(response);
        for (let i = 0; i < 20; i++) {
            await allTitles.push(response.results[i].title);
            await allPosterUrl.push('https://image.tmdb.org/t/p/w440_and_h660_face' + response.results[i].poster_path);
            await allOverview.push(response.results[i].overview)
            await allLanguage.push(response.results[i].original_language)
        }
        setTitle(allTitles)
        setPosterUrl(allPosterUrl)
        setOverview(allOverview)
        setLanguage(allLanguage)
    }

    useEffect(() => {
        if(url.length>0)
        fetching()
    }, [url])

    const handleClick = (e) => {
        setIndex(index + 1)
    }

    //listener for match event
    const [match, setMatch] = useState(null)
    useEffect(() => {
        socket.on('match', index => {
            setShowModal(true)
            console.log('match :', index)
            setMatch(index)
        })
    }, [index])

    return (
        <div>
            {(showModal === true) && <Modal title={title[match]} poster={posterUrl[match]} setShowModal={setShowModal} setShowThanks={setShowThanks} />}
            {(index < 20 && setTitle !== [] && !showThanks) &&
                <Choices title={title[index]} posterUrl={posterUrl[index]} overview={overview[index]} language={language[index]} index={index} handleClick={handleClick}></Choices>
            }
            {((showThanks && !showModal) || index === 20) && <Thanks />}
        </div>
    );
}

export default Fetching;