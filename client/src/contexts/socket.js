import React, { useEffect } from 'react'
import io from 'socket.io-client'

// const ENDPOINT = 'http://localhost:5000/'
const ENDPOINT = 'https://movie-finder-app-react.herokuapp.com/'
export const socket = io(ENDPOINT);

export const SocketListen = ({preferences, setPreferences}) => {

useEffect(()=>{
    socket.on('joint_preferences', (preferences) => {
        setPreferences(preferences)
    })
}, [preferences]
)
    return(
        <div>  
        </div>
    )
}
