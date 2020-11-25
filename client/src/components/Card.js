import React from 'react';
import { socket } from '../contexts/socket'

function Choices({ title, posterUrl, overview, handleClick, index, language }) {

    const languageFunc = (a) => {
        return (a==='en')? 'English' : (a==='es')? 'Spanish' : (a==='fr')? 'French' : (a==='ja')? 'Japanese' : (a==='ko')? 'Korean' : (a==='ru')? 'Russian': 'unknown'
    }
    let originLanguage = languageFunc(language)

    const positive = () => {
        socket.emit('yes', index);
        handleClick()
    }
    
    const colors = ['#F3D7B2','#DBC4DF','#BADBCA','#96B6C5','#B76B66']
    const shadows = ['#a3927c','#958199','#8fa69a','#60747d','#7d4d4a']
let random = Math.floor(Math.random()*5)
    return (
        <div>
            <div className='text-center cards' style={{ backgroundColor:colors[random], 
            boxShadow: `3px 3px 1px ${shadows[random]}` }}>
                    <h1>{title}</h1>
                    <img style={{ height: '350px', width: 'auto' }} src={posterUrl} />
                    <p className='desc'>{overview}</p>
                    <p>Original language: {originLanguage}</p>
                    <div className='btn-wrapper'>
                    <button className='btn' onClick={positive}> Yes!</button>
                    <button className='btn' onClick={handleClick}> No way.</button>
                    </div>
            </div>
        </div>
    );
}

export default Choices;