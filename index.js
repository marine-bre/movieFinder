const express = require('express');
const app = express();
const http = require('http').createServer(app)
const options = {
    cors:true, 
    origins:['http://localhost:3000']
}
const io = require('socket.io')(http, options)
const cors = require('cors')

// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use(cors())

//variable to store potential matches
let indexes=[];


io.on('connection', (socket) => {
    let room;

    console.log('a user has connected');
    socket.on('room', code => {
        socket.join(code)
        console.log(`user has joined room ${code}`)
        room=code
    })
    socket.on('preferences', (preferences) => {
        console.log(preferences, 'FOR', room);
        socket.to(room).emit('joint_preferences', preferences)
    })
    socket.on('yes', index => {
        console.log(indexes)
        if(indexes.indexOf(index)=== -1){
            indexes.push(index) 
            console.log('pushed', index)
        }
        else{
            console.log(`it'a match for movie nº${index}`)
            io.to(room).emit('match', index)
        }
    })
    socket.on('disconnect', () => {
        indexes=[]
        console.log('a user has disconnected')
    })
}
)

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})