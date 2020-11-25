import React, { useEffect } from 'react'
import io from 'socket.io-client'

// const ENDPOINT = 'https://movie-finder-app-react.herokuapp.com'
// export const socket = io(ENDPOINT);

export let socket = io.connect(window.location.hostname)

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
